import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Vibration,
} from "react-native";

const THUMB_SIZE = 40;
const BAR_SIZE = 30;

const CustomSlider = ({
  minValue,
  maxValue,
  currentValue,
  progressValue,
  onValueChange,
  steps,
}: any) => {
  let thumbPosition = useRef<Animated.Value>(new Animated.Value(0)).current;
  let thumbSize = useRef<Animated.Value>(new Animated.Value(0.5)).current;

  const [sliderWidth, setSliderWidth] = useState(0);
  const [initialThumbPos, setInitialThumbPos] = useState(0);

  const progressPercentage =
    ((progressValue - minValue) / (maxValue - minValue)) * 100;

  const updateValue = (position: number) => {
    const usableWidth = sliderWidth - BAR_SIZE / 2;
    const stepSize = usableWidth / (steps - 1);
    const snappedPosition = Math.round(position / stepSize) * stepSize;
    const value =
      minValue + (snappedPosition / usableWidth) * (maxValue - minValue);
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    onValueChange(percentage);
  };

  useEffect(() => {
    const usableWidth = sliderWidth - BAR_SIZE / 2;
    const initialPosition =
      ((currentValue - minValue) / (maxValue - minValue)) * usableWidth -
      THUMB_SIZE / 2;

    thumbPosition = new Animated.Value(initialPosition);
    thumbSize = new Animated.Value(0.5);
    setInitialThumbPos(initialPosition);
  }, [currentValue]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          thumbPosition.stopAnimation((value) => setInitialThumbPos(value));
          Vibration.vibrate(30);
        },
        onPanResponderMove: (_, gestureState) => {
          const usableWidth = sliderWidth - BAR_SIZE / 2;
          const newPosition = Math.max(
            Math.min(initialThumbPos + gestureState.dx, sliderWidth),
            0,
          );
          const stepSize = usableWidth / (steps - 1);
          const snappedPosition = Math.max(
            Math.round(newPosition / stepSize) * stepSize - THUMB_SIZE / 2,
            0,
          );

          updateValue(newPosition);

          Animated.spring(thumbPosition, {
            toValue: snappedPosition,
            useNativeDriver: false,
            friction: 8,
            tension: 100,
          }).start();

          Animated.spring(thumbSize, {
            toValue: 1,
            useNativeDriver: false,
            friction: 8,
            tension: 100,
          }).start();
        },
        onPanResponderRelease: () => {
          Vibration.vibrate(30);
          Animated.spring(thumbSize, {
            toValue: 0.5,
            useNativeDriver: false,
            friction: 8,
            tension: 100,
          }).start();
        },
      }),
    [initialThumbPos],
  );

  const renderStepLines = () => {
    const stepLines = [];
    const usableWidth = sliderWidth - BAR_SIZE / 2;
    const stepWidth = usableWidth / (steps - 1);

    for (let i = 1; i < steps - 1; i++) {
      stepLines.push(
        <View
          key={i}
          style={[
            styles.stepLine,
            {
              left: i * stepWidth - 2,
            },
          ]}
        />,
      );
    }

    return stepLines;
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setSliderWidth(width);
      }}
    >
      {renderStepLines()}

      <View
        style={[
          styles.progressBarBackground,
          { width: `${progressPercentage}%` },
        ]}
      />

      <View style={[styles.sliderTrack]} />

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.hitbox_thumb,
          {
            transform: [{ translateX: thumbPosition }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX: thumbPosition }, { scale: thumbSize }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 50,
    justifyContent: "center",
  },
  sliderTrack: {
    position: "absolute",
    width: "100%",
    height: BAR_SIZE,
    backgroundColor: "#dee8ff",
    borderRadius: 10,
    zIndex: 1,
    top: "50%",
    transform: [{ translateY: -(BAR_SIZE / 2) }],
  },
  progressBarBackground: {
    position: "absolute",
    height: BAR_SIZE,
    zIndex: 2,
    backgroundColor: "#C4D7FF",
    borderRadius: 10,
    top: "50%",
    transform: [{ translateY: -(BAR_SIZE / 2) }],
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: "#87A2FF",
    borderRadius: THUMB_SIZE / 2,
    zIndex: 9,
    position: "absolute",
  },
  // hitbox for HUGE THUMB like mine
  hitbox_thumb: {
    width: THUMB_SIZE * 1.7,
    height: THUMB_SIZE * 1.7,
    zIndex: 10,
    position: "absolute",
  },
  stepLine: {
    position: "absolute",
    width: 4,
    height: THUMB_SIZE,
    zIndex: 2,
    backgroundColor: "#87A2FF",
    opacity: 0.3,
    borderRadius: 10,
    top: "70%",
    transform: [{ translateY: -BAR_SIZE }],
  },
});

export default CustomSlider;
