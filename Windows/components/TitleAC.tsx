import { Styles } from "@/utils/Styles";
import React, { useState, useRef, useCallback } from "react";
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { HorizontalScrollPicker } from "./UI/HorizontalScrollPicker";
import { FontAwesome6 } from "@expo/vector-icons";

export const TitleAC = ({
  temperature,
  onChange,
}: {
  temperature: number;
  onChange: (value: number) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(temperature);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const press = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.93,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(true));
  };

  const adjust = (delta: number) => {
    const next = Math.min(35, Math.max(16, temperature + delta));
    onChange(next);
  };

  const onSelect = () => {
    onChange(tempValue);
    setModalVisible(false);
  };

  const changeValue = useCallback((value: number) => {
    setTempValue(value);
  }, []);

  return (
    <>
      <View
        className="flex-1 rounded-xl ml-2 flex flex-row items-center justify-evenly"
        style={{ height: 110 }}
      >
        <TouchableOpacity
          onPress={() => adjust(-1)}
          activeOpacity={0.7}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#222",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="caret-down" size={18} color="#363636" />
        </TouchableOpacity>

        <TouchableOpacity onPress={press} activeOpacity={0.8}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Text style={{ ...Styles.title, fontSize: 40, color: "#363636" }}>
              {temperature}°
            </Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => adjust(1)}
          activeOpacity={0.7}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#222",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="caret-up" size={18} color="#363636" />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View className="flex-1 items-center justify-center">
          <TouchableWithoutFeedback onPress={onSelect}>
            <View className="h-screen w-full bg-dark-100/20 absolute" />
          </TouchableWithoutFeedback>
          <View
            style={[Styles.shadow, { backgroundColor: "#fff" }]}
            className="w-[80%] rounded-xl flex-col items-center px-5 pb-8 pt-10"
          >
            <HorizontalScrollPicker
              limit={60}
              min={16}
              max={30}
              defaultValue={temperature}
              onValueChange={changeValue}
            />

            <Text style={{ ...Styles.subtitle, fontSize: 20, color: "#222" }}>
              °C
            </Text>

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
    </>
  );
};
