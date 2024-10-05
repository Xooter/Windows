import { Styles } from "@/utils/Styles";
import { Entypo } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";

export const AddButton = () => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const pressButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.7,
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
        className="rounded-xl p-5"
        style={[
          { transform: [{ scale: buttonScale }] },
          Styles.shadow,
          { backgroundColor: "#222" },
        ]}
      >
        <Entypo name="plus" size={24} color="#fff" />
      </Animated.View>
    </TouchableOpacity>
  );
};
