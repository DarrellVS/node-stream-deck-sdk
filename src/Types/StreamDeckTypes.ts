export type Config = {
    port?: number;
    layoutConfig?: Record<string, LAYOUTS>;
    holdDuration?: number;
}

export type Events = {
    pluginConnected: () => void;
    willAppear: (id: string, data: any) => void;
    willDisappear: (id: string) => void;
}

export type BaseEventParams = {
    coordinates: {
        column: number;
        row: number;
    };
    remoteServer: string;
}

export type ButtonEventParams = BaseEventParams & {
    isInMultiAction: boolean;
}

export type LcdEventParams = BaseEventParams & {
    tapPosition: {
        x: number;
        y: number;
    };
}

export type InternalEmitterEvents = {
    dialRotate: (id: string, ticks: number, params: BaseEventParams) => void;
    dialPress: (id: string, params: BaseEventParams) => void;
    dialDown: (id: string, params: BaseEventParams) => void;
    dialUp: (id: string, params: BaseEventParams) => void;
    touchTap: (id: string, params: LcdEventParams) => void;
    touchHold: (id: string, params: LcdEventParams) => void;
    keyDown: (id: string, params: ButtonEventParams) => void;
    keyUp: (id: string, params: ButtonEventParams) => void;
    keyHold: (id: string, params: ButtonEventParams) => void;
}

export enum LAYOUTS {
    ICON = '$X1',
    VALUE = '$A1',
    INDICATOR = '$B1',
    GRADIENT_INDICATOR = '$B2',
    DOUBLE_INDICATOR = '$C1',
}

export type BaseFeedbackType = {
    title?: string;
    icon?: string;
}

export type IconFeedbackType = BaseFeedbackType & {};

export type ValueFeedbackType = BaseFeedbackType & {
    value: string;
}

export type IndicatorFeedbackType = BaseFeedbackType & {
    value: number;
    indicator: number;
    indicatorPostfix?: string;
}

export type GradientIndicatorFeedbackType = BaseFeedbackType & {
    value: number;
    indicator: number;
}

export type DoubleIndicatorFeedbackType = {
    title?: string;
    icon1?: string;
    icon2?: string;
    indicator1: number;
    indicator2: number;
}

export type FeedbackType = IconFeedbackType | ValueFeedbackType | IndicatorFeedbackType | GradientIndicatorFeedbackType | DoubleIndicatorFeedbackType;