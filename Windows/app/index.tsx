import { SendButton } from "@/components/SendButton";
import CustomSlider from "@/components/Slider";
import { WeatherNow } from "@/components/WeatherNow";
import { View } from "react-native";
import { TitleSlider } from "@/components/TitleSlider";

export default function Index() {
  return (
    <View className="flex-col w-full h-full items-center gap-y-5">
      <WeatherNow />
      <TitleSlider text="Curtain" porcentage={25} />
      <CustomSlider
        minValue={0}
        maxValue={100}
        currentValue={100}
        progressValue={25}
        steps={5}
      />
      <TitleSlider text="Blind" porcentage={50} />
      <CustomSlider
        minValue={0}
        maxValue={100}
        currentValue={25}
        progressValue={50}
        steps={5}
      />
      <SendButton text="Send" />
    </View>
  );
}
