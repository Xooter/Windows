import { Styles } from "@/utils/Styles";
import { useRef } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableWithoutFeedback,
  Vibration,
} from "react-native";

export const DayButton = ({
  text,
  selected,
  onSelected,
}: {
  text: string;
  selected: boolean;
  onSelected: () => void;
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.8,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.elastic(3),
      }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        animateButton();
        Vibration.vibrate(50);
        onSelected();
      }}
    >
      <Animated.View
        className="aspect-square border-4 flex items-center justify-center h-10"
        style={[
          Styles.shadow,
          {
            elevation: 3,
            borderColor: selected ? "#87A2FF" : "#3c3c3c",
            backgroundColor: selected ? "#dee8ff" : "#fff",
            borderRadius: 15,
            transform: [{ scale: buttonScale }],
          },
        ]}
      >
        <Text
          style={{
            ...Styles.subtitle,
            fontSize: 25,
            color: selected ? "#87A2FF" : "#3c3c3c",
          }}
        >
          {text}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
