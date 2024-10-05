import { Styles } from "@/utils/Styles";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WEATHER_API } from "../secrets";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "@/utils/WeatherConditions";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const WeatherNow = () => {
  useEffect(() => {}, []);

  return (
    <View
      className="flex-row bg-light items-center justify-between rounded-xl w-[90%] py-5 px-8 mt-20 mb-8"
      style={{ ...Styles.shadow, backgroundColor: "#f8faff" }}
    >
      <View>
        <Text style={{ ...Styles.paragraph, fontSize: 20, opacity: 0.8 }}>
          Sunny
        </Text>
        <View className="flex-row items-end">
          <Text style={[styles.temperature]}>20ᵒ</Text>
          <Text style={styles.temperatureMin}>/</Text>
          <Text style={styles.temperatureMin}>12ᵒ</Text>
        </View>

        <View className="flex-row items-center gap-x-2">
          <FontAwesome6 name="wind" size={14} color="black" />
          <Text style={{ ...Styles.paragraph, fontSize: 20 }}>
            <Text style={Styles.title}>40</Text> km/h
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons
        size={70}
        name={weatherConditions["Clear"].icon as any}
        color={weatherConditions["Clear"].color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  temperature: {
    ...Styles.title,
    color: "#7881ff",
    fontSize: 50,
    marginRight: -8,
  },
  temperatureMin: {
    ...Styles.subtitle,
    fontSize: 25,
    opacity: 0.8,
  },
});
