import { Styles } from "@/utils/Styles";
import React, { useRef } from "react";
import { Text, Animated, Easing, TouchableOpacity } from "react-native";

export const ACButton = ({
  onPress,
  icon,
  text,
}: {
  onPress: () => void;
  icon: React.ReactNode;
  text: string;
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const pressButton = () => {
    onPress();
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
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
      style={{ flex: 1 }}
    >
      <Animated.View
        className="rounded-xl border-2 py-1 flex flex-row items-center justify-center space-x-2"
        style={[
          { transform: [{ scale: buttonScale }] },
          { borderColor: "#222", height: 50 },
        ]}
      >
        {icon}
        <Text style={{ ...Styles.subtitle, fontSize: 24, color: "#363636" }}>
          {text}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
