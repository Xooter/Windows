import { AddRule } from "@/components/AddRule";
import { ConditionContainer } from "@/components/ConditionContainer";
import { TitleAdd } from "@/components/TitleAdd";
import { RulesTitleCard } from "@/components/UI/RulesTitleCard";
import { Rule } from "@/models/Rule";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Vibration, View } from "react-native";

export default function Rules() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletedRule, setDeletedRule] = useState<number>(-1);

  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);

  useEffect(() => {
    const getAllRules = async () => {
      setLoading(true);
      await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002/rules`,
        )
        .then((response) => {
          setRules(response.data);
        })
        .finally(() => setLoading(false));
    };

    getAllRules();
  }, []);

  const onNewRule = (rule: Rule) => {
    setRules([...rules, rule]);
  };

  const activeRule = async (id: number) => {
    await axios.get(
      `http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002/rules/active/${id}`,
    );
  };

  const selectRule = (id: number) => {
    if (deletedRule === id) return;
    Vibration.vibrate(100);
    setDeletedRule(id);
  };

  const deselectRule = (id: number) => {
    if (deletedRule === -1) return;
    if (deletedRule == id) {
      setDeletedRule(-1);
    }
  };

  const deleteRule = async () => {
    if (deletedRule === -1) return;

    await axios
      .delete(
        `http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002/rules/${deletedRule}`,
      )
      .then((response) => {
        setDeletedRule(-1);
        setRules((prev) => prev.filter((alarm) => alarm.id !== response.data));
      });
  };

  return (
    <View className="flex-col w-full h-full items-center pt-14">
      <TitleAdd
        title="Rules"
        onPress={() => {
          if (deletedRule === -1) {
            setIsAddVisible(true);
          } else {
            deleteRule();
          }
        }}
        itemSelected={deletedRule}
      />

      {!loading ? (
        <ScrollView
          className="w-full"
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          {rules.map((rule) => (
            <MemoizedCard
              key={rule.id}
              blind={rule.blind}
              curtain={rule.curtain}
              active={rule.active}
              onActive={() => {
                activeRule(rule.id);
              }}
              onLongPress={() => {
                selectRule(rule.id);
              }}
              onPress={() => {
                deselectRule(rule.id);
              }}
              selected={deletedRule === rule.id}
            >
              <RulesTitleCard
                rule={rule}
                isSelected={deletedRule === rule.id}
              />
            </MemoizedCard>
          ))}
        </ScrollView>
      ) : (
        <View className="flex items-center justify-center w-full h-full">
          <ActivityIndicator size="large" color="#222" />
        </View>
      )}

      <AddRule
        isAddVisible={isAddVisible}
        setIsAddVisible={setIsAddVisible}
        onNewRule={onNewRule}
      />
    </View>
  );
}

export const MemoizedCard = memo(ConditionContainer, (prevProps, nextProps) => {
  return prevProps.selected === nextProps.selected;
});
