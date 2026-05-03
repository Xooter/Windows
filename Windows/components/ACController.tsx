import {
  FontAwesome6,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import TitleAC from "./TitleAC";
import { ACButton } from "./UI/ACButton";
import { CircularButton } from "./UI/CircularButton";
import { SegmentedSwitch } from "./UI/SegmentedSwitch";
import { useState } from "react";

const ACController = () => {
  const [mode, setMode] = useState<any>();
  const [direction, setDirection] = useState<any>();

  return (
    <View className="flex flex-col space-y-3 w-[80%]">
      <View className="flex flex-row">
        <CircularButton onPress={() => {}} icon="power-off" height={110} />
        <TitleAC />
      </View>
      <View>
        <SegmentedSwitch
          options={[
            {
              label: (
                <FontAwesome6
                  name="snowflake"
                  size={20}
                  color={mode === "cold" ? "#fff" : "#7881ff"}
                />
              ),
              value: "cold",
            },
            {
              label: (
                <Ionicons
                  name="flame"
                  size={20}
                  color={mode === "hot" ? "#fff" : "#7881ff"}
                />
              ),
              value: "hot",
            },
            {
              label: (
                <FontAwesome5
                  name="wind"
                  size={20}
                  color={mode === "fan" ? "#fff" : "#7881ff"}
                />
              ),
              value: "fan",
            },
            {
              label: (
                <FontAwesome6
                  name="droplet"
                  size={20}
                  color={mode === "humidity" ? "#fff" : "#7881ff"}
                />
              ),
              value: "humidity",
            },
          ]}
          value={mode}
          onChange={setMode}
        />
      </View>
      <View
        className="flex flex-row"
        style={{ flexDirection: "row", columnGap: 8 }}
      >
        <ACButton
          onPress={() => {}}
          icon={<FontAwesome6 name="brain" size={20} color="#222" />}
          text="Smart"
        />
        <ACButton
          onPress={() => {}}
          icon={<FontAwesome6 name="leaf" size={20} color="#222" />}
          text="Economy"
        />
      </View>
      <View
        className="flex flex-row"
        style={{ flexDirection: "row", columnGap: 8 }}
      >
        <ACButton
          onPress={() => {}}
          icon={<FontAwesome5 name="volume-mute" size={20} color="#222" />}
          text="Quiet"
        />
        <ACButton
          onPress={() => {}}
          icon={<Entypo name="moon" size={20} color="#222" />}
          text="Sleep"
        />
      </View>
      <View>
        <SegmentedSwitch
          options={[
            {
              label: (
                <FontAwesome
                  name="arrows-v"
                  size={18}
                  color={direction === "horizontal" ? "#fff" : "#7881ff"}
                />
              ),
              value: "horizontal",
            },
            {
              label: (
                <FontAwesome
                  name="arrows-h"
                  size={18}
                  color={direction === "vertical" ? "#fff" : "#7881ff"}
                />
              ),
              value: "vertical",
            },
          ]}
          value={direction}
          onChange={setDirection}
        />
      </View>
      <View
        className="flex flex-row"
        style={{ flexDirection: "row", columnGap: 8 }}
      >
        <CircularButton onPress={() => {}} icon="fan" size={20} height={50} />
        <ACButton
          onPress={() => {}}
          icon={<Ionicons name="flame" size={20} color="#222" />}
          text="Super"
        />
      </View>
    </View>
  );
};

export default ACController;
