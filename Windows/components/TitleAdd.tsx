import { Text, View } from "react-native";
import { AddButton } from "./UI/AddButton";
import { Styles } from "@/utils/Styles";

export const TitleAdd = ({
  title,
  onAdd,
}: {
  title: string;
  onAdd?: () => void;
}) => {
  return (
    <View className="flex-row items-center justify-between w-full mb-5 px-4">
      <Text style={{ ...Styles.title, fontSize: 55 }}>{title}</Text>
      <AddButton />
    </View>
  );
};
