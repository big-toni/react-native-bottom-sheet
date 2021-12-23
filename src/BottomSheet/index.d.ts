declare module '../..index.js' {
  import * as React from 'react';

  export type BottomSheetChildren =
    | React.ReactNode
    | React.ReactElement<any>
    | React.ReactElement<any>[];

  export interface BottomSheetProps {
    backdropColor?: string;
    children?: BottomSheetChildren;
    handle?: React.ReactElement<any>;
    onMove?: (...args: any[]) => any;
    onStateChange?: (...args: any[]) => any;
    positions?: number[];
    style?: Object;
    useNativeDriver: boolean;
  }

  const BottomSheet: React.FC<BottomSheetProps>;

  export default BottomSheet;
}
