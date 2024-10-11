import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Styles } from "../../utils/Styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FontAwesome } from "@expo/vector-icons";

export const SendButton = ({
  text,
  loading,
  onPress,
}: {
  text: string;
  loading: boolean;
  onPress: () => void;
}) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;
  const buttonWidth = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const WITH_ANIMATION_DURATION = 300;
    const ELASTIC_FACTOR = 2;
    if (loading) {
      const rotationAnimation = Animated.loop(
        Animated.timing(rotationDegree, {
          toValue: 360,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );

      const widthAnimation = Animated.timing(buttonWidth, {
        toValue: 55,
        duration: WITH_ANIMATION_DURATION,
        easing: Easing.elastic(ELASTIC_FACTOR / 2),
        useNativeDriver: false,
      });

      Animated.parallel([rotationAnimation, widthAnimation]).start();

      return () => {
        rotationAnimation.stop();
        widthAnimation.stop();
      };
    } else {
      Animated.timing(buttonWidth, {
        toValue: 270,
        duration: WITH_ANIMATION_DURATION,
        easing: Easing.elastic(ELASTIC_FACTOR),
        useNativeDriver: false,
      }).start();
      rotationDegree.setValue(0);
    }
  }, [loading, rotationDegree, buttonWidth]);

  const Send = () => {
    if (loading) return;

    Vibration.vibrate(50);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={Send}
      style={{ ...Styles.shadow, backgroundColor: "#222" }}
      className="p-5 rounded-xl mx-3 flex-row justify-center space-x-2 items-center mt-auto mb-24 h-20"
    >
      <Animated.View
        style={{
          width: buttonWidth,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
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
      </Animated.View>
    </TouchableOpacity>
  );
};
