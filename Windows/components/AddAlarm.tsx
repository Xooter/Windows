import { useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import TimePickerModal from "./UI/TimePickerModal";
import { AddModal } from "./AddModal";
import { DayButton } from "./UI/DayButton";
import { TitleSlider } from "./TitleSlider";
import CustomSlider from "./UI/Slider";
import { Styles } from "@/utils/Styles";
import axios from "axios";
import { Alarm, AlarmCreateDTO } from "@/models/Alarm";

export const AddAlarm = ({
  isAddVisible,
  setIsAddVisible,
  onNewAlarm,
}: {
  isAddVisible: boolean;
  setIsAddVisible: (value: boolean) => void;
  onNewAlarm: (alarm: Alarm) => void;
}) => {
  const DAYS_NUMS = [0, 1, 2, 3, 4];
  const days_week = ["L", "M", "M", "J", "V", "S", "D"];

  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [daysSelected, setDaySelected] = useState<number[]>(DAYS_NUMS);
  const [time, setTime] = useState<Date>(new Date());
  const [oneTime, setOneTime] = useState<boolean>(false);

  const [curtain, setCurtain] = useState<number>(0);
  const [blind, setBlind] = useState<number>(0);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const onTimeSelected = (hours: number, minutes: number) => {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    setTime(date);
  };

  const openTimeModal = () => {
    setTimeModalVisible(true);

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
    const newAlarm: AlarmCreateDTO = {
      curtain: curtain / 100,
      blind: blind / 100,
      time: time.getTime(),
      days: daysSelected,
      one_time: oneTime,
    };

    axios
      .post(
        `http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002/alarms`,
        newAlarm,
      )
      .then((response) => {
        setIsAddVisible(false);
        onNewAlarm(response.data);
      })
      .finally(() => {
        setCurtain(0);
        setBlind(0);
        setTime(new Date());
        setDaySelected(DAYS_NUMS);
        setOneTime(false);
      });
  };

  return (
    <View>
      <TimePickerModal
        visible={timeModalVisible}
        onClose={() => {
          setTimeModalVisible(false);
        }}
        onTimeSelected={onTimeSelected}
        time={time}
        setOneTime={setOneTime}
        oneTime={oneTime}
      />

      <AddModal
        onNew={onNew}
        isVisible={isAddVisible}
        onClose={() => {
          setIsAddVisible(false);
        }}
      >
        <Animated.View
          className="w-full rounded-xl py-1"
          style={{
            backgroundColor: "#222",

            transform: [{ scale: buttonScale }],
          }}
        >
          <TouchableOpacity activeOpacity={0.95} onPress={openTimeModal}>
            <Text
              style={{
                ...Styles.title,
                fontSize: 60,
                color: "#fff",
              }}
              className="mx-auto"
            >
              {time.getHours().toString().padStart(2, "0") +
                ":" +
                time.getMinutes().toString().padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TitleSlider text="Curtain" porcentage={curtain} />
        <CustomSlider
          minValue={0}
          maxValue={100}
          currentValue={50}
          progressValue={0}
          steps={5}
          onValueChange={(value: number) => {
            setCurtain(value);
          }}
        />
        <TitleSlider text="Blind" porcentage={blind} />
        <CustomSlider
          minValue={0}
          maxValue={100}
          currentValue={50}
          progressValue={0}
          steps={5}
          onValueChange={(value: number) => {
            setBlind(value);
          }}
        />

        <View className="flex-row items-center justify-around w-full mt-5">
          {days_week.map((day, index) => {
            return (
              <DayButton
                key={index}
                text={day}
                selected={daysSelected.includes(index)}
                onSelected={() => {
                  if (daysSelected.includes(index)) {
                    setDaySelected(daysSelected.filter((d) => d !== index));
                  } else {
                    setDaySelected([...daysSelected, index]);
                  }
                }}
              />
            );
          })}
        </View>
      </AddModal>
    </View>
  );
};
