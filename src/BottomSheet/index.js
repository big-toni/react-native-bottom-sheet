import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  PanResponder,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const { height } = Dimensions.get('window');

const removeDuplicates = (array) => {
  let set = new Set(array);
  let values = set.values();
  return Array.from(values);
};

const BottomSheet = forwardRef(
  (
    {
      backdropColor,
      children,
      handle,
      style,
      onMove,
      onStateChange,
      useNativeDriver = false,
      yPositions,
    },
    ref
  ) => {
    const positionsArray = removeDuplicates(yPositions).sort((a, b) => a - b);
    const lowestPosition = positionsArray[0];
    const highestPosition = positionsArray[positionsArray.length - 1];

    const animateMove = (y, toValue, callback) => {
      Animated.spring(y, {
        toValue: -toValue,
        tension: 50,
        useNativeDriver,
      }).start((finished) => {
        finished && callback && callback(y);
      });
    };

    const getNextPosition = (currentState, val, margin) => {
      const currentIndex = positionsArray.indexOf(currentState);
      const higherState = positionsArray[currentIndex + 1];
      const lowerState = positionsArray[currentIndex - 1];
      if (val > currentState + margin && higherState !== undefined) {
        return higherState;
      } else if (val < currentState - margin && lowerState !== undefined) {
        return lowerState;
      } else {
        return currentState;
      }
    };

    const y = useRef(new Animated.Value(-lowestPosition)).current;
    const [position, setPosition] = useState(-y._value);
    const margin = 0.1 * height;
    const movementValue = (moveY) => height - moveY;

    const onPanResponderMove = (_, { moveY }) => {
      const val = movementValue(moveY);
      animateMove(y, val);
      onMove && onMove(val);
    };

    const onPanResponderRelease = (_, { moveY }) => {
      const valueToMove = height - moveY;
      const nextPosition = getNextPosition(position, valueToMove, margin);
      moveToPosition(nextPosition);
    };

    const moveToPosition = (position) => {
      setPosition(position);
      animateMove(y, position);

      onStateChange && onStateChange(position);
      onMove && onMove(position);
    };

    const onMoveShouldSetPanResponder = (_, { dy }) => {
      return Math.abs(dy) >= 10;
    };

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onMoveShouldSetPanResponder,
          onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
          onPanResponderMove,
          onPanResponderRelease,
        }),
      [position]
    );

    useImperativeHandle(ref, () => ({
      open: () => {
        moveToPosition(highestPosition);
      },
      close: () => {
        moveToPosition(lowestPosition);
      },
      moveTo: (y) => {
        moveToPosition(y);
      },
    }));

    const opacity = y.interpolate({
      inputRange: [-highestPosition, -lowestPosition],
      outputRange: [0.5, 0],
    });

    // NOTE: Need to pass pan handlers to handle element
    const Handle =
      handle &&
      React.cloneElement(handle, {
        ...panResponder.panHandlers,
        pointerEvents: 'auto',
      });

    const isOpen = position === highestPosition;

    return backdropColor ? (
      <View pointerEvents="box-none" style={[StyleSheet.absoluteFill]}>
        <Animated.View
          pointerEvents={isOpen ? 'auto' : 'box-none'}
          style={[
            backdropColor && { opacity, backgroundColor: backdropColor },
            StyleSheet.absoluteFill,
          ]}
        >
          {isOpen && (
            <TouchableOpacity
              onPress={() => moveToPosition(lowestPosition)}
              style={[StyleSheet.absoluteFill]}
            />
          )}
        </Animated.View>
        <Animated.View
          style={[styles.container, style, { transform: [{ translateY: y }] }]}
          {...(!handle && { ...panResponder.panHandlers })}
        >
          {!!handle && Handle}
          {children}
        </Animated.View>
      </View>
    ) : (
      <Animated.View
        // pointerEvents="box-none"
        style={[styles.container, style, { transform: [{ translateY: y }] }]}
        {...(!handle && { ...panResponder.panHandlers })}
        // {...(!renderHandle && { ...panResponder.panHandlers })}
      >
        {!!handle && Handle}
        {/* {!!renderHandle && renderHandle({ ...panResponder.panHandlers })} */}
        {children}
      </Animated.View>
    );
  }
);

BottomSheet.propTypes = {
  backdropColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  handle: PropTypes.element,
  onMove: PropTypes.func,
  onStateChange: PropTypes.func,
  style: PropTypes.object,
  useNativeDriver: PropTypes.bool.isRequired,
  yPositions: PropTypes.arrayOf(PropTypes.number),
};

export default BottomSheet;
