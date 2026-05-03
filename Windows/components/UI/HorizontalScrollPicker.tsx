import { Styles } from "@/utils/Styles";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Animated,
  ScrollView,
  View,
  Easing,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Vibration,
} from "react-native";

export const HorizontalScrollPicker = memo(
  ({
    limit,
    onValueChange,
    defaultValue = 0,
    min = 0,
    max,
  }: {
    limit?: number;
    onValueChange: (value: number) => void;
    defaultValue?: number;
    min?: number;
    max?: number;
  }) => {
    const resolvedMin = min;
    const resolvedMax = max ?? (limit !== undefined ? limit - 1 : 0);
    const count = resolvedMax - resolvedMin + 1;

    const [value, setValue] = useState(defaultValue);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const numbers = useMemo(
      () => Array.from({ length: count }, (_, i) => i + resolvedMin),
      [count, resolvedMin],
    );
    const animScales = useRef(numbers.map(() => new Animated.Value(1))).current;

    useEffect(() => {
      if (scrollViewRef.current) {
        const scrollToPosition = (defaultValue - resolvedMin) * 70;
        scrollViewRef.current.scrollTo({
          x: scrollToPosition,
          animated: false,
        });
      }
      setValue(defaultValue);
    }, [defaultValue]);

    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        snapToInterval={70}
        decelerationRate="fast"
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const rawIndex = (e.nativeEvent.contentOffset.x + 70 / 2) / 70;
          const index = resolvedMin + (rawIndex < 1 ? 0 : Math.floor(rawIndex));
          setValue(index);
          onValueChange(index);
          if (Math.round(index) !== Math.round(value)) {
            Vibration.vibrate(5);
          }
        }}
        scrollEventThrottle={10}
      >
        {numbers.map((num) => {
          const animIdx = num - resolvedMin;
          useEffect(() => {
            Animated.timing(animScales[animIdx], {
              toValue: value === num ? 2 : 1,
              duration: 200,
              useNativeDriver: true,
              easing: Easing.elastic(3),
            }).start();
          }, [value, num]);

          return (
            <View
              key={num}
              style={{ width: 70, height: 70 }}
              className="flex items-center justify-center"
            >
              <Animated.Text
                style={[
                  value === num ? Styles.title : Styles.subtitle,
                  {
                    fontSize: 25,
                    opacity:
                      value === num + 1 || value === num - 1 || value === num
                        ? 1
                        : 0.2,
                    color: value === num ? "#7881ff" : "#3c3c3c",
                    transform: [{ scale: animScales[animIdx] }],
                  },
                ]}
              >
                {num.toString().padStart(2, "0")}
              </Animated.Text>
            </View>
          );
        })}
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: 50,
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
