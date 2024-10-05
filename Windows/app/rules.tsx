import { ConditionContainer } from "@/components/ConditionContainer";
import { TitleAdd } from "@/components/TitleAdd";
import { View } from "react-native";

export default function Rules() {
  return (
    <View className="flex-col w-full h-full items-center pt-14">
      <TitleAdd title="Rules" />
      <ConditionContainer />
      <ConditionContainer />
      <ConditionContainer />
    </View>
  );
}
