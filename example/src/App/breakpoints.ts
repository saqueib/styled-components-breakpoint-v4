import {defaults, BreakpointMap} from '../../../src';

export type DefaultBreakpointName = 'mobile' | 'tablet' | 'desktop';
export type CustomBreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ExampleBreakpointName =
  | DefaultBreakpointName
  | CustomBreakpointName;
export type ExampleBreakpointMapName =
  | BreakpointMap<DefaultBreakpointName>
  | BreakpointMap<CustomBreakpointName>;

export const defaultBreakpoints: BreakpointMap<
  DefaultBreakpointName
> = defaults;
export const customBreakpoints: BreakpointMap<CustomBreakpointName> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const breakpointTitles: Record<
  DefaultBreakpointName | CustomBreakpointName,
  string
> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
  xs: 'XS',
  sm: 'SM',
  md: 'MD',
  lg: 'LG',
  xl: 'XL',
};

export const breakpointColors: Record<
  DefaultBreakpointName | CustomBreakpointName,
  string
> = {
  mobile: '#D7F2BA',
  tablet: '#BDE4A8',
  desktop: '#9CC69B',
  xs: '#D7F2BA',
  sm: '#BDE4A8',
  md: '#9CC69B',
  lg: '#79B4A9',
  xl: '#556C70',
};
