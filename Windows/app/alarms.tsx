import { ConditionContainer } from "@/components/ConditionContainer";
import { TitleAdd } from "@/components/TitleAdd";
import { View } from "react-native";

export default function Alarms() {
  return (
    <View className="flex-col w-full h-full items-center pt-14">
      <TitleAdd title="Alarm" />
      <ConditionContainer />
      <ConditionContainer />
      <ConditionContainer />
    </View>
  );
}
