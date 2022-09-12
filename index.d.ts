import * as React from 'react';

declare module '@big-toni/react-native-bottom-sheet' {
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
