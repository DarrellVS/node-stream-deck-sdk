import { EventEmitter } from 'events';
import { EmitterEvents } from '../Types/ControllerTypes';

export class TypedEventEmitter<T extends EmitterEvents> {
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor() {}

  public emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    this.eventEmitter.emit(event as string, ...args);
  }

  public on<K extends keyof T>(event: K, listener: T[K]) {
    this.eventEmitter.on(event as string, listener);
  }
}