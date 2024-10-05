import { WeatherNow } from "@/components/WeatherNow";
import { View } from "react-native";

export default function Alarms() {
  return (
    <View className="flex-col w-full h-full items-center gap-y-5">
      <WeatherNow />
    </View>
  );
}
