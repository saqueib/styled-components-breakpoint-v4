import {Breakpoints, ValueOrValues, MapValueToStyleFunction} from './types';
import {createBreakpoint} from './createBreakpoint';

// ensure the values are keyed in breakpoint order, otherwise specificity issues may occur
const checkValuesOrdering = <
  B extends string | number,
  V extends string | number
>(
  breakpoints: Breakpoints<B>,
  values: ValueOrValues<B, V>,
) => {
  const breakpointKeys = Object.keys(breakpoints);
  const valueKeys = Object.keys(values);
  let previousIndex = -1;
  Object.keys(values).some(k => {
    const index = breakpointKeys.indexOf(k);
    if (index !== -1 && index <= previousIndex) {
      console.warn(
        `styled-components-breakpoint: Values for ${valueKeys
          .map(n => `"${n}"`)
          .join(', ')} are not keyed in order (${breakpointKeys
          .map(n => `"${n}"`)
          .join(', ')}) and may result in specificity issues.`,
      );
      return true;
    } else {
      previousIndex = index;
      return false;
    }
  });
};

export const createMap = <B extends string | number>(
  breakpoints: Breakpoints<B>,
) => {
  const fn = createBreakpoint(breakpoints);
  return <V extends string | number>(
    valueOrValues: ValueOrValues<B, V>,
    mapValueToStyle: MapValueToStyleFunction,
  ) => {
    if (typeof valueOrValues !== 'object') {
      return mapValueToStyle(valueOrValues);
    }

    if (process.env.NODE_ENV !== 'production') {
      checkValuesOrdering(breakpoints, valueOrValues);
    }
    const keys = Object.keys(valueOrValues) as B[];
    return keys.map(key => {
      const tag = fn(key);
      const val = valueOrValues[key];
      // @ts-ignore - ignore inability to create a real TemplateStringsArray
      const styles = tag([], mapValueToStyle(val));
      return styles;
    });
  };
};
