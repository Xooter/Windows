import { RuleType } from "@/models/Rule";
import { typeColor } from "@/utils/RuleColors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
    }
  };
  return <>{typeIcon()}</>;
};
