import { BaseController } from './Controllers/Base/BaseController';
import { WebSocketServer } from 'ws';
import {
  Events,
  LAYOUTS,
  type BaseEventParams,
  type ButtonEventParams,
  type Config,
  type FeedbackType,
  type InternalEmitterEvents,
  type LcdEventParams,
  Layout,
} from './Types/StreamDeckTypes';
import { requiredFieldsPerFeedbackType } from './constants';
import { validateRequiredFields } from './Helpers/FieldsHelpers';
import { extractFields } from './Helpers/FieldsHelpers';
import { getLayoutByName } from './Helpers/LayoutHelpers';

export class StreamDeck extends BaseController<Events> {
  private wss: WebSocketServer;
  private connectedSockets = new Map<string, any>();
  private idToContext = new Map<string, string>();
  private internalEmitter = new BaseController<InternalEmitterEvents>();
  private downDials = new Set();
  private dialLayouts = new Map<string, LAYOUTS>();
  private buttonDownTimeouts = new Map<string, NodeJS.Timeout>();
  private holdDuration = 500;

  constructor(config: Config) {
    super();

    const layoutConfig = config.layoutConfig ?? {};
    const port = config.port ?? 3456;
    this.holdDuration = config.holdDuration ?? 500;

    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (ws) => {
      this.emit('pluginConnected');

      ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        if (data.action !== 'org.tynsoe.streamdeck.wsproxy.proxy') return;

        const { id } = data.payload.settings;

        const exisitingSocket = this.connectedSockets.get(data.context);
        this.connectedSockets.set(data.context, ws);
        if (!exisitingSocket) {
          this.idToContext.set(id, data.context);
        }

        if (layoutConfig[id] && !this.dialLayouts.has(id)) {
          this.setLayout(id, layoutConfig[id]);
        }

        switch (data.event) {
          case 'willAppear':
            this.emit('willAppear', id, {
              data,
            });
            break;

          case 'willDisappear':
            this.emit('willDisappear', id);
            ws.close();
            break;

          case 'dialRotate':
            this.internalEmitter.emit(
              'dialRotate',
              id,
              data.payload.ticks,
              this.extractBaseDialFields(data.payload)
            );
            break;

          case 'dialPress':
            // Deduplicate dial press events as they are sent twice
            if (this.downDials.has(id)) {
              this.downDials.delete(id);
              break;
            }
            this.internalEmitter.emit(
              'dialPress',
              id,
              this.extractBaseDialFields(data.payload)
            );
            break;

          case 'dialDown':
            this.internalEmitter.emit(
              'dialDown',
              id,
              this.extractBaseDialFields(data.payload)
            );
            this.downDials.add(id);
            break;

          case 'dialUp':
            this.internalEmitter.emit(
              'dialUp',
              id,
              this.extractBaseDialFields(data.payload)
            );
            break;

          case 'touchTap':
            const isHold = data.payload.hold;
            this.internalEmitter.emit(isHold ? 'touchHold' : 'touchTap', id, {
              ...this.extractBaseDialFields(data.payload),
              tapPosition: {
                x: data.payload.tapPos[0],
                y: data.payload.tapPos[1],
              },
            });

          case 'keyDown':
            this.internalEmitter.emit(
              'keyDown',
              id,
              this.extractBaseButtonFields(data.payload)
            );
            this.buttonDownTimeouts.set(
              id,
              setTimeout(() => {
                this.internalEmitter.emit(
                  'keyHold',
                  id,
                  this.extractBaseButtonFields(data.payload)
                );
              }, this.holdDuration)
            );
            break;

          case 'keyUp':
            this.internalEmitter.emit(
              'keyUp',
              id,
              this.extractBaseButtonFields(data.payload)
            );
            clearTimeout(this.buttonDownTimeouts.get(id));
            break;

          default:
            break;
        }
      });
    });
  }

  private extractBaseDialFields(data: any) {
    return extractFields(data, ['coordinates', 'remoteServer']);
  }

  private extractBaseButtonFields(data: any) {
    return extractFields(data, [
      'coordinates',
      'remoteServer',
      'isInMultiAction',
    ]);
  }

  public onDialRotate(
    id: string,
    callback: (value: number, params: BaseEventParams) => void
  ) {
    this.internalEmitter.on('dialRotate', (dialId, value, params) => {
      if (dialId === id) {
        callback(value, params);
      }
    });
  }

  public onDialPress(id: string, callback: (params: BaseEventParams) => void) {
    this.internalEmitter.on('dialPress', (dialId, params) => {
      if (dialId === id) {
        callback(params);
      }
    });
  }

  public onDialDown(id: string, callback: (params: BaseEventParams) => void) {
    this.internalEmitter.on('dialDown', (dialId, params) => {
      if (dialId === id) {
        callback(params);
      }
    });
  }

  public onDialUp(id: string, callback: (params: BaseEventParams) => void) {
    this.internalEmitter.on('dialUp', (dialId, params) => {
      if (dialId === id) {
        callback(params);
      }
    });
  }

  public onLcdTap(id: string, callback: (params: LcdEventParams) => void) {
    this.internalEmitter.on('touchTap', (lcdId, params) => {
      if (lcdId === id) {
        callback(params);
      }
    });
  }

  public onLcdHold(id: string, callback: (params: LcdEventParams) => void) {
    this.internalEmitter.on('touchHold', (lcdId, params) => {
      if (lcdId === id) {
        callback(params);
      }
    });
  }

  public onButtonDown(
    id: string,
    callback: (params: ButtonEventParams) => void
  ) {
    this.internalEmitter.on('keyDown', (keyId, params) => {
      if (keyId === id) {
        callback(params);
      }
    });
  }

  public onButtonHold(
    id: string,
    callback: (params: ButtonEventParams) => void
  ) {
    this.internalEmitter.on('keyHold', (keyId, params) => {
      if (keyId === id) {
        callback(params);
      }
    });
  }

  public onButtonUp(id: string, callback: (params: ButtonEventParams) => void) {
    this.internalEmitter.on('keyUp', (keyId, params) => {
      if (keyId === id) {
        callback(params);
      }
    });
  }

  private sendSocketMessage(id: string, message: any) {
    const context = this.idToContext.get(id);
    if (!context) return false;

    const socket = this.connectedSockets.get(context);
    if (!socket) return false;

    socket.send(JSON.stringify(message));
  }

  public setLayout(id: string, layout: Layout) {
    const parsedLayout = getLayoutByName(layout);
    this.dialLayouts.set(id, parsedLayout);

    return this.sendSocketMessage(id, {
      event: 'setFeedbackLayout',
      context: this.idToContext.get(id),
      payload: {
        layout: parsedLayout,
      },
    });
  }

  public setDisplay(id: string, params: FeedbackType) {
    const layout = this.dialLayouts.get(id);

    // Only validate required fields if a layout is set
    if (layout) {
      const requiredFields = requiredFieldsPerFeedbackType[layout];
      validateRequiredFields(params, requiredFields);
    }

    return this.sendSocketMessage(id, {
      event: 'setFeedback',
      context: this.idToContext.get(id),
      payload: params,
    });
  }
}
