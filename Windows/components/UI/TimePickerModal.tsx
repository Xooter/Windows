import { Styles } from "@/utils/Styles";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { HorizontalScrollPicker } from "./HorizontalScrollPicker";
import { Entypo } from "@expo/vector-icons";
import AnimatedSwitch from "./Switch";

const TimePickerModal = ({
  visible,
  onClose,
  onTimeSelected,
  time,
  oneTime,
  setOneTime,
}: {
  visible: boolean;
  onClose: () => void;
  onTimeSelected: (hours: number, minutes: number) => void;
  time: Date;
  oneTime: boolean;
  setOneTime: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const selectTime = () => {
    onTimeSelected(hours, minutes);
    onClose();
  };

  const changeHours = useCallback((value: number) => {
    setHours(value);
  }, []);

  const changeMinutes = useCallback((value: number) => {
    setMinutes(value);
  }, []);

  useEffect(() => {
    const [hour, min] = getTime();
    setHours(hour);
    setMinutes(min);
  }, [visible, time]);

  function getTime(): number[] {
    const fechaActual = time;
    const hour = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();

    return [hour, minutes];
  }

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View className="flex-1 items-center justify-center">
        <TouchableWithoutFeedback onPress={selectTime}>
          <View className="h-screen w-full bg-dark-100/20 absolute" />
        </TouchableWithoutFeedback>
        <View
          style={[
            Styles.shadow,
            {
              backgroundColor: "#fff",
            },
          ]}
          className="w-[80%] rounded-xl flex-col items-center px-5 py-8 gap-y-2"
        >
          <HorizontalScrollPicker
            limit={24}
            defaultValue={getTime()[0]}
            onValueChange={changeHours}
          />

          <Entypo name="dots-two-vertical" size={50} color="#7881ff" />
          <HorizontalScrollPicker
            limit={60}
            defaultValue={getTime()[1]}
            onValueChange={changeMinutes}
          />
          <View className="w-full flex-row justify-between items-center ">
            <Text
              style={{ ...Styles.subtitle, fontSize: 25, color: "#222" }}
              className="mr-5"
            >
              One Time
            </Text>
            <AnimatedSwitch
              isOn={oneTime}
              onToggle={() => {
                setOneTime((prev: boolean) => !prev);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={selectTime}
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

export default TimePickerModal;
