import { Styles } from "@/utils/Styles";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const TitleSlider = ({
  text,
  porcentage,
}: {
  text: string;
  porcentage: number;
}) => {
  return (
    <View className="flex-row items-center justify-between w-full px-10 mt-5">
      <View className="flex-row items-center gap-x-1">
        <FontAwesome name="arrow-circle-right" size={25} color="#7881ff" />
        <Text style={{ ...Styles.title, fontSize: 30, color: "#363636" }}>
          {text}
        </Text>
      </View>
      <Text style={{ ...Styles.title, fontSize: 20, color: "#7881ff" }}>
        {porcentage}%
      </Text>
    </View>
  );
};
