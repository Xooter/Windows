import { RuleType } from "@/models/Rule";
import { typeColor } from "@/utils/RuleColors";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";

export const RuleIcons = ({ type }: { type: RuleType }) => {
  const typeIcon = () => {
    switch (type) {
      case RuleType.TEMPERATURE:
        return <Ionicons name="sunny" size={40} color={typeColor(type)} />;
      case RuleType.WIND:
        return (
          <MaterialCommunityIcons
            name="windsock"
            size={40}
            color={typeColor(type)}
          />
        );
      case RuleType.RAIN:
        return <Ionicons name="rainy" size={40} color={typeColor(type)} />;
      case RuleType.SUN_POSITION:
        return (
          <MaterialCommunityIcons
            name="weather-sunset"
            size={40}
            color={typeColor(type)}
          />
        );
      default:
        return <AntDesign name="unknowfile1" size={40} color="#222" />;
    }
  };
  return typeIcon();
};
