import { RuleType } from "@/models/Rule";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Vibration,
} from "react-native";
import { RuleIcons } from "./RuleIcons";
import { typeColor } from "@/utils/RuleColors";

export const RulePickerButton = ({
  type,
  setType,
}: {
  type: RuleType;
  setType: (type: RuleType) => void;
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  function changeType(): void {
    const newType = (type + 1) % 3;
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
  }

  return (
    <TouchableWithoutFeedback onPress={changeType}>
      <Animated.View
        style={{
          borderColor: typeColor(type),
          borderWidth: 5,
          transform: [{ scale: buttonScale }],
        }}
        className="aspect-square flex items-center justify-center rounded-full p-5"
      >
        <RuleIcons type={type} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
