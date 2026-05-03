import { Styles } from "@/utils/Styles";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";

export const CircularButton = ({
  onPress,
  icon,
  height,
  size = 35,
}: {
  onPress: () => void;
  icon: string;
  height?: number;
  size?: number;
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const pressButton = () => {
    onPress();
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.elastic(3),
      }),
    ]).start();
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={pressButton}>
      <Animated.View
        className="rounded-xl border-2 flex justify-center items-center aspect-square"
        style={[
          { transform: [{ scale: buttonScale }] },
          Styles.shadow,
          { height: height, backgroundColor: "#222", borderColor: "#222" },
        ]}
      >
        <FontAwesome6 name={icon} size={size} color="#fff" />
      </Animated.View>
    </TouchableOpacity>
  );
};
