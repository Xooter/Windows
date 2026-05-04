import { useAcStore } from "@/hooks/useAcStore";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRef } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";

export const FanSpeedButton = ({
  height,
  size = 30,
}: {
  height?: number;
  size?: number;
}) => {
  const { disabled, ac, setFanSpeed } = useAcStore();
  const buttonScale = useRef(new Animated.Value(1)).current;

  const pressButton = () => {
    const next = (ac.fan || 1) >= 4 ? 1 : (ac.fan || 1) + 1;
    setFanSpeed(next);
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
        className="rounded-xl border-2 flex justify-center items-center aspect-square"
        style={[
          { transform: [{ scale: buttonScale }] },
          { height, backgroundColor: "transparent", borderColor: "#222" },
        ]}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <FontAwesome6 name="fan" size={size} color="#222" />
          <View style={{ flexDirection: "row-reverse", gap: 2 }}>
            {[4, 3, 2, 1].map((level) => (
              <FontAwesome6
                key={level}
                name="caret-right"
                size={10}
                color={ac.fan >= level ? "#222" : "#ccc"}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
