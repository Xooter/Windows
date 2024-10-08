import { Styles } from "@/utils/Styles";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WEATHER_URL } from "../secrets";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "@/utils/WeatherConditions";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { Weather } from "@/models/Weather";

export const WeatherNow = () => {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const getCurrentWeather = async () => {
      axios
        .get(WEATHER_URL)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getCurrentWeather();
  }, []);

  return (
    <View
      className="flex-row bg-light items-center justify-between rounded-xl w-[90%] py-5 px-8 mt-20 mb-8"
      style={{ ...Styles.shadow, backgroundColor: "#f8faff" }}
    >
      <View>
        <Text
          style={{ ...Styles.paragraph, fontSize: 20, opacity: 0.8 }}
          className="capitalize"
        >
          {weather?.weather[0].main}
        </Text>
        <View className="flex-row items-end">
          <Text style={[styles.temperature]}>
            {weather?.main.temp.toFixed(0)}ᵒ
          </Text>
          <Text style={styles.temperatureMin}>/</Text>
          <Text style={styles.temperatureMin}>
            {weather?.main.temp_min.toFixed(0)}ᵒ
          </Text>
        </View>

        <View className="flex-row items-center gap-x-2">
          <FontAwesome6 name="wind" size={14} color="black" />
          <Text style={{ ...Styles.paragraph, fontSize: 20 }}>
            <Text style={Styles.title}>{weather?.wind.speed}</Text> km/h
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons
        size={70}
        name={
          weatherConditions[
            (weather?.weather[0].main as keyof typeof weatherConditions) ||
              "Snow"
          ].icon as any
        }
        color={
          weatherConditions[
            (weather?.weather[0].main as keyof typeof weatherConditions) ||
              "Snow"
          ].color
        }
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
