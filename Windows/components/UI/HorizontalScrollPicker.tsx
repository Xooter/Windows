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
  }: {
    limit: number;
    onValueChange: (value: number) => void;
    defaultValue?: number;
  }) => {
    const [value, setValue] = useState(defaultValue);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const generateNumbers = (limit: any) => {
      return Array.from({ length: limit }, (_, i) => i);
    };

    const numbers = useMemo(() => generateNumbers(limit), [limit]);
    const animScales = useRef(numbers.map(() => new Animated.Value(1))).current;

    useEffect(() => {
      if (scrollViewRef.current) {
        const scrollToPosition = defaultValue * 70;
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
          var index = (e.nativeEvent.contentOffset.x + 70 / 2) / 70;

          if (index < 1) {
            index = 0;
          } else {
            index = Math.floor(index);
          }

          setValue(index);
          onValueChange(index);

          if (Math.round(index) !== Math.round(value)) {
            Vibration.vibrate(5);
          }
        }}
        scrollEventThrottle={10}
      >
        {numbers.map((num) => {
          useEffect(() => {
            Animated.timing(animScales[num], {
              toValue: value === num ? 2 : 1,
              duration: 200,
              useNativeDriver: true,
              easing: Easing.elastic(3),
            }).start();
          }, [value, num]);

          return (
            <View
              key={num}
              style={{
                width: 70,
                height: 70,
              }}
              className="flex items-center justify-center"
            >
              <Animated.Text
                style={[
                  value == num ? Styles.title : Styles.subtitle,
                  {
                    fontSize: 25,
                    opacity:
                      value == num + 1 || value == num - 1 || value == num
                        ? 1
                        : 0.2,
                    color: value == num ? "#7881ff" : "#3c3c3c",
                    transform: [{ scale: animScales[num] }],
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
