import { SendButton } from "@/components/UI/SendButton";
import CustomSlider from "@/components/UI/Slider";
import { WeatherNow } from "@/components/WeatherNow";
import { Vibration, View } from "react-native";
import { TitleSlider } from "@/components/TitleSlider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
  type CurrentValues = {
    curtain: number;
    blind: number;
  };

  const [blindValue, setBlindValue] = useState<number>(0);
  const [curtainValue, setCurtainValue] = useState<number>(0);
  const [sending, setSending] = useState<boolean>(false);

  const [currentValues, setCurrentValues] = useState<CurrentValues>({
    curtain: 0,
    blind: 0,
  });

  useEffect(() => {
    const getInfo = async () => {
      await axios.get(`${process.env.BASE_BACK}/`).then((response) => {
        setCurrentValues(response.data);
        console.log(response.data);
      });
    };

    getInfo();
  }, []);

  const sendValues = async () => {
    const dataValues = {
      curtain: curtainValue / 100,
      blind: blindValue / 100,
    };
    setSending(true);
    axios
      .post(`${process.env.BASE_BACK}`, dataValues)
      .then((response) => {
        Vibration.vibrate([100, 1, 100, 1]);
        console.log(response.data);
        setCurrentValues(dataValues);
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <View className="flex-col h-full items-center gap-y-5">
      <WeatherNow />
      <TitleSlider text="Curtain" porcentage={curtainValue} />
      <CustomSlider
        minValue={0}
        maxValue={100}
        currentValue={0}
        progressValue={currentValues.curtain}
        onValueChange={(value: number) => {
          setCurtainValue(value);
        }}
        steps={5}
      />
      <TitleSlider text="Blind" porcentage={blindValue} />
      <CustomSlider
        minValue={0}
        maxValue={100}
        currentValue={0}
        progressValue={currentValues.blind}
        onValueChange={(value: number) => {
          setBlindValue(value);
        }}
        steps={5}
      />
      <SendButton text="Send" loading={sending} onPress={sendValues} />
    </View>
  );
}
