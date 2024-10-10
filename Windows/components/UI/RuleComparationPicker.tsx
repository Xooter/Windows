import { RuleComparator } from "@/models/Rule";
import { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Vibration,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export const RuleComparationPicker = ({
  type,
  setType,
}: {
  type: RuleComparator;
  setType: (type: RuleComparator) => void;
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;
  const iconRotation = useRef(new Animated.Value(1)).current;

  function changeType(): void {
    const newType = (type + 1) % 2;
    console.log("changeType", newType);
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
      toValue: newType === RuleComparator.GREATER ? 1 : 0,
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
        <FontAwesome5 name="less-than" size={40} color="#7881ff" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
