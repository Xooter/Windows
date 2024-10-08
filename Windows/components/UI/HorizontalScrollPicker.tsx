import { Styles } from "@/utils/Styles";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Animated,
  ScrollView,
  View,
  Easing,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

export const HorizontalScrollPicker = ({
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
  const isInitialMount = useRef(true);

  const generateNumbers = (limit: any) => {
    return Array.from({ length: limit }, (_, i) => i);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      if (scrollViewRef.current) {
        isInitialMount.current = false;
        const scrollToPosition = defaultValue * 70;
        scrollViewRef.current.scrollTo({
          x: scrollToPosition,
          animated: false,
        });
      }
    } else {
      setValue(defaultValue);
    }
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
        if (isInitialMount.current) return;
        var index = (e.nativeEvent.contentOffset.x + 70 / 2) / 70;
        if (index < 1) {
          index = 0;
        } else {
          index = Math.round(index);
        }
        setValue(index);
        onValueChange(index);
      }}
      scrollEventThrottle={20}
    >
      {generateNumbers(limit).map((num) => {
        const animScale = useRef(new Animated.Value(1)).current;

        Animated.timing(animScale, {
          toValue: value == num ? 2 : 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.elastic(3),
        }).start();

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
                  transform: [{ scale: animScale }],
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
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: 50,
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
