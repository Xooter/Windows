import CustomSlider from "@/components/Slider";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-col w-full h-screen items-center justify-center">
      <Text>Slider</Text>
      <CustomSlider
        minValue={0}
        maxValue={100}
        currentValue={100}
        progressValue={30}
        steps={5}
      />
      <CustomSlider
        minValue={0}
        maxValue={100}
        currentValue={100}
        progressValue={30}
        steps={5}
      />
    </View>
  );
}
