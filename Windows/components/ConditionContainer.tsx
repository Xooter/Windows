import { Styles } from "@/utils/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import AnimatedSwitch from "./UI/Switch";

export const ConditionContainer = () => {
  return (
    <View
      style={[
        Styles.shadow,
        {
          backgroundColor: "#fff",
        },
      ]}
      className="w-[95%] p-5 rounded-xl flex-col mb-4"
    >
      <Text style={{ ...Styles.title, fontSize: 18 }}>One Time</Text>
      <View className="flex-row justify-between items-center gap-y-2">
        <Text style={{ ...Styles.title, fontSize: 35, color: "#7881ff" }}>
          14:00
        </Text>
        <AnimatedSwitch
          isOn={true}
          onToggle={(newState: any) => console.log("Switch state:", newState)}
        />
      </View>

      <View className="bg-accent h-1 w-full rounded-xl my-1" />
      <View className="flex-row gap-x-2 items-center justify-between">
        <View className="flex-row items-center gap-x-1">
          <MaterialCommunityIcons name="blinds" size={20} color="#87A2FF" />
          <Text style={{ ...Styles.subtitle, fontSize: 25 }}>100%</Text>
        </View>
        <View className="flex-row items-center gap-x-1">
          <MaterialCommunityIcons
            name="curtains-closed"
            size={20}
            color="#87A2FF"
          />
          <Text style={{ ...Styles.subtitle, fontSize: 25 }}>25%</Text>
        </View>
      </View>
    </View>
  );
};
