import { useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import { AddModal } from "./AddModal";
import { TitleSlider } from "./TitleSlider";
import CustomSlider from "./UI/Slider";
import axios from "axios";
import { Rule, RuleComparator, RuleCreateDTO, RuleType } from "@/models/Rule";
import RulePickerModal from "./UI/RulePickerModal";
import { RulesTitleCard } from "./UI/RulesTitleCard";

export const AddRule = ({
  isAddVisible,
  setIsAddVisible,
  onNewRule,
}: {
  isAddVisible: boolean;
  setIsAddVisible: (value: boolean) => void;
  onNewRule: (rule: Rule) => void;
}) => {
  const DEFAULT_RULE: RuleCreateDTO = {
    curtain: 0,
    blind: 0,
    type: 0,
    comparator: 0,
    value: 0,
  };

  const [ruleModalVisible, setRuleModalVisible] = useState(false);
  const [rule, setRule] = useState<RuleCreateDTO>(DEFAULT_RULE);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const openTimeModal = () => {
    setRuleModalVisible(true);

    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.elastic(3),
      }),
    ]).start();
  };

  const onNew = () => {
    axios
      .post(
        `http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002/rules`,
        rule,
      )
      .then((response) => {
        setIsAddVisible(false);
        onNewRule(response.data);
      })
      .finally(() => {
        setRule(DEFAULT_RULE);
      });
  };

  function onAddModalClose(
    type: RuleType,
    comparator: RuleComparator,
    value: number,
  ): void {
    setRule((prev) => {
      return { ...prev, type: type, comparator: comparator, value: value };
    });
    setRuleModalVisible(false);
  }

  return (
    <View>
      <RulePickerModal
        visible={ruleModalVisible}
        onClose={onAddModalClose}
        rule={rule}
      />
      <AddModal
        onNew={onNew}
        isVisible={isAddVisible}
        onClose={() => {
          setIsAddVisible(false);
        }}
      >
        <Animated.View
          className="w-full rounded-xl"
          style={{
            backgroundColor: "#222",
            transform: [{ scale: buttonScale }],
          }}
        >
          <TouchableOpacity activeOpacity={0.95} onPress={openTimeModal}>
            <View className="py-3 mx-auto">
              <RulesTitleCard
                rule={{
                  id: 0,
                  active: true,
                  ...rule,
                }}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <TitleSlider text="Curtain" porcentage={rule.curtain * 100} />
        <CustomSlider
          minValue={0}
          maxValue={100}
          currentValue={50}
          progressValue={0}
          steps={5}
          onValueChange={(value: number) => {
            setRule((prev) => {
              return { ...prev, curtain: value / 100 };
            });
          }}
        />
        <TitleSlider text="Blind" porcentage={rule.blind * 100} />
        <CustomSlider
          minValue={0}
          maxValue={100}
          currentValue={50}
          progressValue={0}
          steps={5}
          onValueChange={(value: number) => {
            setRule((prev) => {
              return { ...prev, blind: value / 100 };
            });
          }}
        />
      </AddModal>
    </View>
  );
};
