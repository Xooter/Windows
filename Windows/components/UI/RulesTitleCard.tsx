import { Rule, RuleComparator, RuleType } from "@/models/Rule";
import { Styles } from "@/utils/Styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const RulesTitleCard = ({
  rule,
  isSelected,
}: {
  rule: Rule;
  isSelected: boolean;
}) => {
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
        <MaterialCommunityIcons
          name="windsock"
          size={50}
          color={!isSelected ? "#7881ff" : "#EB3678"}
        />
      )}
      {rule.type === RuleType.SUN_POSITION ? (
        rule.comparator == 0 ? (
          <>
            <Feather
              name="sunrise"
              size={50}
              color={!isSelected ? "#7881ff" : "#EB3678"}
            />
            <Text
              style={{
                ...Styles.title,
                fontSize: 45,
                color: !isSelected ? "#7881ff" : "#EB3678",
              }}
              className="capitalize ml-4"
            >
              Sunrise
            </Text>
          </>
        ) : (
          <>
            <Feather
              name="sunset"
              size={50}
              color={!isSelected ? "#7881ff" : "#EB3678"}
            />
            <Text
              style={{
                ...Styles.title,
                fontSize: 45,
                color: !isSelected ? "#7881ff" : "#EB3678",
              }}
              className="capitalize ml-4"
            >
              Sunset
            </Text>
          </>
        )
      ) : null}
      {rule.type === RuleType.RAIN ? (
        <>
          <Ionicons
            name="rainy"
            size={50}
            color={!isSelected ? "#87A2FF" : "#EB3678"}
          />

          <Text
            style={{
              ...Styles.title,
              fontSize: 45,
              color: !isSelected ? "#7881ff" : "#EB3678",
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
                color: !isSelected ? "#7881ff" : "#EB3678",
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
                  color: !isSelected ? "#7881ff" : "#EB3678",
                }}
                className="ml-2"
              >
                {rule.value}
              </Text>

              <Text
                style={{
                  ...Styles.title,
                  fontSize: 25,
                  color: !isSelected ? "#7881ff" : "#EB3678",
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
