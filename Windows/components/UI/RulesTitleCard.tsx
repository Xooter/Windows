import { Rule, RuleComparator, RuleType } from "@/models/Rule";
import { Styles } from "@/utils/Styles";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const RulesTitleCard = ({
  rule,
  isSelected = null,
}: {
  rule: Rule;
  isSelected?: boolean | null;
}) => {
  const iconColor = !isSelected ? "#7881ff" : "#EB3678";

  const SunPositionSubText = () => {
    return (
      <View className="flex-row items-center ml-4">
        <FontAwesome5
          name="clock"
          size={20}
          color={!isSelected ? "#222" : "#EB3678"}
        />
        <Text
          style={{
            ...Styles.subtitle,
            fontSize: 18,
            color:
              isSelected === null
                ? "#fff"
                : isSelected === false
                  ? "#222"
                  : "#EB3678",
          }}
          className="capitalize ml-2"
        >
          +{rule.value}"
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-row items-center">
      {rule.type === RuleType.TEMPERATURE && (
        <Ionicons
          name="sunny"
          size={50}
          color={!isSelected ? "#f7b733" : "#EB3678"}
        />
      )}
      {rule.type === RuleType.WIND && (
        <MaterialCommunityIcons name="windsock" size={50} color={iconColor} />
      )}
      {rule.type === RuleType.SUN_POSITION ? (
        rule.comparator == 0 ? (
          <>
            <Feather name="sunrise" size={50} color={iconColor} />
            <View className="flex-col items-center">
              <Text
                style={{
                  ...Styles.title,
                  fontSize: 45,
                  color: iconColor,
                }}
                className="capitalize ml-4"
              >
                Sunrise
              </Text>
              {rule.value != 0 && <SunPositionSubText />}
            </View>
          </>
        ) : (
          <>
            <Feather name="sunset" size={50} color={iconColor} />
            <View className="flex-col">
              <Text
                style={{
                  ...Styles.title,
                  fontSize: 45,
                  color: iconColor,
                }}
                className="capitalize ml-4"
              >
                Sunset
              </Text>
              {rule.value != 0 && <SunPositionSubText />}
            </View>
          </>
        )
      ) : null}
      {rule.type === RuleType.RAIN ? (
        <>
          <Ionicons name="rainy" size={50} color={iconColor} />

          <Text
            style={{
              ...Styles.title,
              fontSize: 45,
              color: iconColor,
            }}
            className="capitalize ml-4"
          >
            Rain
          </Text>
        </>
      ) : (
        <>
          {rule.type === RuleType.TEMPERATURE && (
            <Text
              style={{
                ...Styles.title,
                fontSize: 45,
                color: iconColor,
              }}
              className="ml-4"
            >
              {rule.comparator === RuleComparator.LESS ? "<" : ">"}
            </Text>
          )}
          {rule.type === RuleType.TEMPERATURE || rule.type === RuleType.WIND ? (
            <>
              <Text
                style={{
                  ...Styles.title,
                  fontSize: 35,
                  color: iconColor,
                }}
                className="ml-2"
              >
                {rule.value}
              </Text>

              <Text
                style={{
                  ...Styles.title,
                  fontSize: 25,
                  color: iconColor,
                  marginBottom: "auto",
                }}
              >
                {rule.type === RuleType.TEMPERATURE ? "°" : "k/h"}
              </Text>
            </>
          ) : null}
        </>
      )}
    </View>
  );
};
