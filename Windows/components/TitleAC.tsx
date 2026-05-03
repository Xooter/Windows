import { Styles } from "@/utils/Styles";
import { View, Text } from "react-native";

const TitleAC = () => {
  return (
    <View
      className="flex-1 rounded-xl border-2 ml-2 flex flex-row items-center justify-evenly"
      style={{
        height: 110,
      }}
    >
      <Text style={{ ...Styles.title, fontSize: 30, color: "#363636" }}>
        30ᵒ
      </Text>
    </View>
  );
};

export default TitleAC;
