import { Styles } from "@/utils/Styles";
import React, { useCallback, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { HorizontalScrollPicker } from "./HorizontalScrollPicker";
import { RulePickerButton } from "./RulePickerButton";
import { RuleComparator, RuleCreateDTO, RuleType } from "@/models/Rule";
import { RuleComparationPicker } from "./RuleComparationPicker";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const RulePickerModal = ({
  visible,
  onClose,
  rule,
}: {
  visible: boolean;
  onClose: (type: RuleType, comparator: RuleComparator, value: number) => void;
  rule: RuleCreateDTO;
}) => {
  const [value, setValue] = useState(rule.value);
  const [comparator, setComparator] = useState<RuleComparator>(rule.comparator);
  const [type, setType] = useState<RuleType>(rule.type);

  const onSelect = () => {
    onClose(type, comparator, value);
  };

  const changeValue = useCallback((value: number) => {
    setValue(value);
  }, []);

  const allowedValuePicker = [
    RuleType.TEMPERATURE,
    RuleType.WIND,
    RuleType.SUN_POSITION,
  ];

  const allowedComparationButton = [
    RuleType.TEMPERATURE,
    RuleType.SUN_POSITION,
  ];

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View className="flex-1 items-center justify-center">
        <TouchableWithoutFeedback onPress={onSelect}>
          <View className="h-screen w-full bg-dark-100/20 absolute" />
        </TouchableWithoutFeedback>
        <View
          style={[
            Styles.shadow,
            {
              backgroundColor: "#fff",
            },
          ]}
          className="w-[80%] rounded-xl flex-col items-center px-5 pb-8 pt-2"
        >
          <View className="flex-row gap-x-2 justify-around w-full mb-2 mt-2">
            <RulePickerButton type={type} setType={setType} />
            {allowedComparationButton.includes(type) && (
              <RuleComparationPicker
                icon={
                  type === RuleType.TEMPERATURE ? (
                    <FontAwesome5 name="less-than" size={40} color="#7881ff" />
                  ) : (
                    <FontAwesome name="arrow-up" size={40} color="#7881ff" />
                  )
                }
                type={comparator}
                setType={setComparator}
              />
            )}
          </View>
          {allowedValuePicker.includes(type) && (
            <HorizontalScrollPicker
              limit={60}
              defaultValue={rule.value}
              onValueChange={changeValue}
            />
          )}

          {type === RuleType.SUN_POSITION ? (
            <Text style={{ ...Styles.subtitle, fontSize: 20, color: "#222" }}>
              On
              <Text
                style={{
                  ...Styles.title,
                  fontSize: 20,
                  color: "#7881ff",
                }}
              >
                {comparator === 0 ? " Sunrise" : " Sunset"}
              </Text>
              {value != 0 ? " +" + value + " minutes" : ""}
            </Text>
          ) : (
            type !== RuleType.RAIN && (
              <Text style={{ ...Styles.subtitle, fontSize: 20, color: "#222" }}>
                {type === RuleType.WIND ? "km/h" : "°C"}
              </Text>
            )
          )}
          <TouchableOpacity
            onPress={onSelect}
            activeOpacity={0.95}
            className="p-5 rounded-xl flex-row justify-center items-center h-15 w-full mt-5"
            style={[Styles.shadow, { backgroundColor: "#222" }]}
          >
            <Text style={{ ...Styles.subtitle, fontSize: 20, color: "#fff" }}>
              Select
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RulePickerModal;
