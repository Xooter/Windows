import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Styles } from "../utils/Styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FontAwesome } from "@expo/vector-icons";

export const SendButton = ({ text }: { text: string }) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const animation = Animated.loop(
        Animated.timing(rotationDegree, {
          toValue: 360,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );

      animation.start();

      return () => animation.stop();
    } else {
      rotationDegree.setValue(0);
    }
  }, [loading, rotationDegree]);

  const Send = () => {
    if (loading) return;

    Vibration.vibrate(50);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={Send}
      style={{ ...Styles.shadow, backgroundColor: "#222" }}
      className="p-5 rounded-xl mx-3 flex-row justify-center space-x-2 items-center w-[80%] mt-auto mb-24 h-20"
    >
      {loading ? (
        <Animated.View
          style={[
            { borderTopColor: "#fff" },
            {
              transform: [
                {
                  rotateZ: rotationDegree.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <FontAwesome5 name="spinner" size={25} color="#fff" />
        </Animated.View>
      ) : (
        <>
          <FontAwesome name="send" size={25} color="#fff" />

          <Text style={{ ...Styles.paragraph, fontSize: 25, color: "#fff" }}>
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
