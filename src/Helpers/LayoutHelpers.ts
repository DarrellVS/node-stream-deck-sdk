import { LAYOUTS, Layout } from '../Types/StreamDeckTypes';

const layoutMap: Record<Layout, LAYOUTS> = {
  icon: LAYOUTS.ICON,
  value: LAYOUTS.VALUE,
  indicator: LAYOUTS.INDICATOR,
  gradientIndicator: LAYOUTS.GRADIENT_INDICATOR,
  doubleIndicator: LAYOUTS.DOUBLE_INDICATOR,
};

export const getLayoutByName = (layout: Layout): LAYOUTS => {
  return layoutMap[layout];
};
