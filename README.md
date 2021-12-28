# @big-toni/react-native-bottom-sheet

## Features

**NO DEPENDENCIES**

- Smooth movement animations
- Plain simple and flexible APIs
- Customizable backdrop opacity and color
- Listeners for the sheet state and position changes
- Swipeable

## Setup

This library is available on npm, install it with: `npm i @big-toni/react-native-bottom-sheet` or `yarn add @big-toni/react-native-bottom-sheet`.

## Usage

Import `@big-toni/react-native-bottom-sheet` and wrap your content inside
it:

```js
import React, { useRef } from 'react';
import { Dimensions, Text } from 'react-native';
import { BottomSheet } from '@big-toni/react-native-bottom-sheet';

const { height, width } = Dimensions.get('screen');

const DRAWER_CLOSED = 0;
const DRAWER_PEEK = height * 0.3;
const DRAWER_OPEN = height * 0.8;
...

const sheetRef = useRef(null);

```

```jsx
<BottomSheet
  handle={
    <View style={{ height: 60, width }}>
      <Text onPress={() => sheetRef.current?.open()}>Open</Text>
    </View>
  }
  onMove={(y) => console.log('Drawer moved to: ', y)}
  onStateChange={(y) => console.log('Drawer new state: ', y)}
  ref={sheetRef}
  yPositions={[DRAWER_CLOSED, DRAWER_PEEK, DRAWER_OPEN]}
>
  <View>
    <Text onPress={() => sheetRef.current?.close()}>Close</Text>
  </View>
</BottomSheet>
```

## Available props

| **Prop**          | **Type** | **Default**  | **Description**                                                      |
| ----------------- | -------- | ------------ | -------------------------------------------------------------------- |
| `backdropColor`   | `string` | `null`       | The backdrop background color, if not privided, there is no backdrop |
| `children`        | `node`   | **REQUIRED** | The sheet content                                                    |
| `handle`          | `node`   | `null`       | Sheet handle node and pan responder gets attached to it \*           |
| `onMove`          | `func`   | `() => null` | Called when the sheet moves                                          |
| `onStateChange`   | `func`   | `() => null` | Called when the sheet state changes                                  |
| `ref`             | `func`   | `() => null` | Catch the reference of the component.                                |
| `style`           | `any`    | `null`       | Style applied to the sheet                                           |
| `useNativeDriver` | `bool`   | `false`      | Defines if animations should use native driver                       |
| `yPositions`      | `array`  | **REQUIRED** | Y positions array                                                    |

\* When no handle provided, panResponder is attached to children node

### Methods

Use `ref` to get the component reference.

| **Method** | **Parameter** | **Description**                       |
| ---------- | ------------- | ------------------------------------- |
| `close`    | `null`        | Moves sheet to the lowest y position  |
| `moveTo`   | `number`      | Moves sheet to specified y position   |
| `open`     | `null`        | Moves sheet to the highest y position |
