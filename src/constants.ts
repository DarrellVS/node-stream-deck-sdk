import { LAYOUTS } from './Types/StreamDeckTypes';

export const requiredFieldsPerFeedbackType: Record<LAYOUTS, string[]> = {
    [LAYOUTS.ICON]: ['icon'],
    [LAYOUTS.VALUE]: ['value'],
    [LAYOUTS.INDICATOR]: ['value', 'indicator'],
    [LAYOUTS.GRADIENT_INDICATOR]: ['value', 'indicator'],
    [LAYOUTS.DOUBLE_INDICATOR]: ['icon1', 'icon2', 'indicator1', 'indicator2'],
}
