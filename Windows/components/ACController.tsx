import {
  FontAwesome6,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { View } from "react-native";
import { ACButton } from "./UI/ACButton";
import { CircularButton } from "./UI/CircularButton";
import { SegmentedSwitch } from "./UI/SegmentedSwitch";
import { TitleAC } from "./TitleAC";
import { AC_MODES, FAN_DIRECTION, useAcStore } from "@/hooks/useAcStore";
import { FanSpeedButton } from "./FanSpeedButton";

const ACController = () => {
  const {
    ac,
    disabled,
    toggleDirection,
    setFanSpeed,
    setTemperature,
    setMode,
    toggleOn,
    setSmart,
    setEconomy,
    setSuper,
    setQuiet,
  } = useAcStore();

  return (
    <View className="flex flex-col space-y-3 w-[80%]">
      <View className="flex flex-row">
        <CircularButton
          disabled={disabled}
          onPress={toggleOn}
          isOn={ac.on}
          icon="power-off"
          height={110}
        />
        <TitleAC
          disabled={disabled}
          temperature={ac.temperature}
          onChange={(t) => {
            setTemperature(t);
          }}
        />
      </View>
      <View>
        <SegmentedSwitch
          disabled={disabled}
          options={[
            {
              label: (
                <FontAwesome6
                  name="snowflake"
                  size={20}
                  color={ac.mode === AC_MODES.COLD ? "#fff" : "#7881ff"}
                />
              ),
              value: AC_MODES.COLD,
            },
            {
              label: (
                <Ionicons
                  name="flame"
                  size={20}
                  color={ac.mode === AC_MODES.HOT ? "#fff" : "#7881ff"}
                />
              ),
              value: AC_MODES.HOT,
            },
            {
              label: (
                <FontAwesome5
                  name="wind"
                  size={20}
                  color={ac.mode === AC_MODES.FAN ? "#fff" : "#7881ff"}
                />
              ),
              value: AC_MODES.FAN,
            },
            {
              label: (
                <FontAwesome6
                  name="droplet"
                  size={20}
                  color={ac.mode === AC_MODES.HUMIDITY ? "#fff" : "#7881ff"}
                />
              ),
              value: AC_MODES.HUMIDITY,
            },
          ]}
          value={ac.mode}
          onChange={(val) => setMode(val)}
        />
      </View>
      <View
        className="flex flex-row"
        style={{ flexDirection: "row", columnGap: 8 }}
      >
        <ACButton
          disabled={disabled}
          isOn={ac.smart}
          onPress={() => {
            setSmart();
          }}
          icon={<FontAwesome6 name="brain" size={20} color="#222" />}
          text="Smart"
        />
        <ACButton
          disabled={disabled}
          isOn={ac.economy}
          onPress={() => {
            setEconomy(!ac.economy);
          }}
          icon={<FontAwesome6 name="leaf" size={20} color="#222" />}
          text="Economy"
        />
      </View>
      <View
        className="flex flex-row"
        style={{ flexDirection: "row", columnGap: 8 }}
      >
        <ACButton
          disabled={disabled}
          isOn={ac.quiet}
          onPress={() => {
            setQuiet(!ac.quiet);
          }}
          icon={<FontAwesome5 name="volume-mute" size={20} color="#222" />}
          text="Quiet"
        />
        <ACButton
          disabled={disabled}
          isOn={ac.sleep}
          onPress={() => {
            setQuiet(!ac.sleep);
          }}
          icon={<Entypo name="moon" size={20} color="#222" />}
          text="Sleep"
        />
      </View>
      <View>
        <SegmentedSwitch
          disabled={disabled}
          options={[
            {
              label: (
                <FontAwesome
                  name="arrows-v"
                  size={18}
                  color={
                    ac.direction === FAN_DIRECTION.HORIZONTAL
                      ? "#fff"
                      : "#7881ff"
                  }
                />
              ),
              value: FAN_DIRECTION.HORIZONTAL,
            },
            {
              label: (
                <FontAwesome
                  name="arrows-h"
                  size={18}
                  color={
                    ac.direction === FAN_DIRECTION.VERTICAL ? "#fff" : "#7881ff"
                  }
                />
              ),
              value: FAN_DIRECTION.VERTICAL,
            },
          ]}
          value={ac.direction}
          onChange={toggleDirection}
        />
      </View>
      <View
        className="flex flex-row"
        style={{ flexDirection: "row", columnGap: 8 }}
      >
        <FanSpeedButton
          disabled={disabled}
          onPress={(val) => setFanSpeed(val)}
          value={ac.fan}
        />
        <ACButton
          disabled={disabled}
          isOn={ac.super}
          onPress={() => {
            setSuper(!ac.super);
          }}
          icon={<Ionicons name="flame" size={20} color="#222" />}
          text="Super"
        />
      </View>
    </View>
  );
};

export default ACController;
