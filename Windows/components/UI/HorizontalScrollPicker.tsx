import { Styles } from "@/utils/Styles";
import { useRef, useState } from "react";
import { StyleSheet, Animated, ScrollView, View, Easing } from "react-native";

export const HorizontalScrollPicker = () => {
  const [value, setValue] = useState(0);
  const generateNumbers = (limit: any) => {
    return Array.from({ length: limit }, (_, i) => i);
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      snapToInterval={70}
      decelerationRate="fast"
      onScroll={(e) => {
        var index = (e.nativeEvent.contentOffset.x + 70 / 2) / 70;

        if (index < 2) {
          index = Math.round(index);
        } else {
          index = Math.floor(index);
        }
        setValue(index);
      }}
      scrollEventThrottle={20}
    >
      {generateNumbers(60).map((num) => {
        const animScale = useRef(new Animated.Value(1)).current;

        Animated.timing(animScale, {
          toValue: value == num ? 1.5 : 1,
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
            className="flex items-center"
          >
            <Animated.Text
              style={[
                Styles.subtitle,
                {
                  fontSize: 25,
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
    height: 70,
    paddingHorizontal: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
