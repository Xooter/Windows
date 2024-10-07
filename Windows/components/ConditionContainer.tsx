import { Styles } from "@/utils/Styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import AnimatedSwitch from "./UI/Switch";

export const ConditionContainer = ({
  children,
  curtain,
  blind,
  days,
  one_time,
  active,
  onActive,
}: {
  children: React.ReactNode;

  curtain: number;
  blind: number;

  days?: number[];
  one_time?: boolean;

  active: boolean;
  onActive: (active: boolean) => void;
}) => {
  const days_week = ["L", "M", "Mi", "J", "V", "S", "D"];

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
      <View className="flex-row justify-between items-center">
        <Text
          style={{
            ...Styles.title,
            fontSize: 18,
            opacity: one_time ? 0.2 : 1,
          }}
        >
          One Time
        </Text>

        <View className="flex-row items-center gap-x-1">
          {days_week.map((_: string, index: number) => (
            <FontAwesome
              key={index}
              name="circle"
              size={9}
              color={days?.includes(index) ? "#7881ff" : "#dee8ff"}
            />
          ))}
        </View>
      </View>
      <View className="flex-row justify-between items-center">
        {children}
        <AnimatedSwitch isOn={active} onToggle={onActive} />
      </View>

      <View className="flex-row gap-x-2 items-center justify-between">
        <View className="flex-row items-center gap-x-1">
          <MaterialCommunityIcons name="blinds" size={20} color="#87A2FF" />
          <Text style={{ ...Styles.subtitle, fontSize: 25 }}>
            {blind * 100}%
          </Text>
        </View>
        <View className="flex-row items-center gap-x-1">
          <MaterialCommunityIcons
            name="curtains-closed"
            size={20}
            color="#87A2FF"
          />
          <Text style={{ ...Styles.subtitle, fontSize: 25 }}>
            {curtain * 100}%
          </Text>
        </View>
      </View>
    </View>
  );
};
