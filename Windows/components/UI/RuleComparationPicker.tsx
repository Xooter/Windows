import { RuleComparator } from "@/models/Rule";
import { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Vibration,
} from "react-native";

export const RuleComparationPicker = ({
  type,
  setType,
  icon,
}: {
  type: RuleComparator;
  setType: (type: RuleComparator) => void;
  icon: React.ReactNode;
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;
  const iconRotation = useRef(new Animated.Value(type)).current;

  function changeType(): void {
    const newType = (type + 1) % 2;
    setType(newType);
    Vibration.vibrate(20);

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

    Animated.timing(iconRotation, {
      toValue: newType,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.elastic(3),
    }).start();
  }

  const spin = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <TouchableWithoutFeedback onPress={changeType}>
      <Animated.View
        style={{
          borderColor: "#7881ff",
          borderWidth: 10,
          transform: [{ scale: buttonScale }, { rotate: spin }],
        }}
        className="aspect-square flex items-center justify-center rounded-full"
      >
        {icon}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
