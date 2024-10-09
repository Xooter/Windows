import { Styles } from "@/utils/Styles";
import React, { useState, useEffect, useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Easing,
  Vibration,
} from "react-native";

const AnimatedSwitch = ({
  isOn,
  onToggle,
  switchWidth = 60,
  switchHeight = 30,
}: {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  switchWidth?: number;
  switchHeight?: number;
}) => {
  const [switchState, setSwitchState] = useState(isOn);
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: switchState ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [switchState]);

  const toggleSwitch = () => {
    Vibration.vibrate(50);
    setSwitchState(!switchState);
    if (onToggle) onToggle(!switchState);
  };

  const animatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#dee8ff", "#87A2FF"],
  });

  const circlePosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, switchWidth - switchHeight],
    easing: Easing.elastic(1),
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <Animated.View
        style={[
          styles.switchContainer,
          Styles.shadow,
          {
            width: switchWidth,
            height: switchHeight,
            backgroundColor: animatedBackgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.switchCircle,
            {
              height: switchHeight,
              width: switchHeight,
              transform: [{ translateX: circlePosition }],
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    borderRadius: 20,
    justifyContent: "center",
    padding: 2,
  },
  switchCircle: {
    backgroundColor: "#7881ff",
    borderRadius: 50,
  },
});

export default AnimatedSwitch;
