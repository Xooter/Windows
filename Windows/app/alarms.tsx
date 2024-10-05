import { ConditionContainer } from "@/components/ConditionContainer";
import { AddButton } from "@/components/UI/AddButton";
import { Styles } from "@/utils/Styles";
import { Text, View } from "react-native";

export default function Alarms() {
  return (
    <View className="flex-col w-full h-full items-center pt-14">
      <View className="flex-row items-center justify-between w-full mb-5 px-4">
        <Text style={{ ...Styles.title, fontSize: 55 }}>Alarm</Text>
        <AddButton />
      </View>
      <ConditionContainer />
      <ConditionContainer />
      <ConditionContainer />
    </View>
  );
}
