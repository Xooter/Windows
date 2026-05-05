import { FontAwesome6 } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";

export const CircularButton = ({
  onPress,
  icon,
  height,
  size = 35,
  isOn,
  disabled,
}: {
  onPress: () => void;
  icon: string;
  height?: number;
  size?: number;
  isOn?: boolean;
  disabled: boolean;
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
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={pressButton}
      style={{ opacity: disabled ? 0.5 : 1 }}
      disabled={disabled}
    >
      <Animated.View
        className="rounded-xl border-4 flex justify-center items-center aspect-square"
        style={[
          { transform: [{ scale: buttonScale }] },
          {
            height: height,
            backgroundColor: isOn ? "#EB3678" : "transparent",
            borderColor: isOn ? "#EB3678" : "#222",
          },
        ]}
      >
        <FontAwesome6 name={icon} size={size} color={isOn ? "#fff" : "#222"} />
      </Animated.View>
    </TouchableOpacity>
  );
};
