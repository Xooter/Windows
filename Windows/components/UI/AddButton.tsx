import { Styles } from "@/utils/Styles";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";

export const AddButton = ({
  onPress,
  itemSelected,
}: {
  onPress: () => void;
  itemSelected: number;
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const iconRotation = useRef(new Animated.Value(0)).current;

  const pressButton = () => {
    onPress();
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

  useEffect(() => {
    Animated.timing(iconRotation, {
      toValue: itemSelected !== -1 ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
      easing: Easing.elastic(3),
    }).start();
  }, [itemSelected]);

  const spin = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={pressButton}>
      <Animated.View
        className="rounded-xl p-5"
        style={[
          { transform: [{ scale: buttonScale }] },
          Styles.shadow,
          { backgroundColor: itemSelected !== -1 ? "#EB3678" : "#222" },
        ]}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Entypo name="plus" size={24} color="#fff" />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};
