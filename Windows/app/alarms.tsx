import { ConditionContainer } from "@/components/ConditionContainer";
import { TitleAdd } from "@/components/TitleAdd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { BASE_BACK } from "../secrets";
import { Alarm } from "@/models/Alarm";
import { Styles } from "@/utils/Styles";

export default function Alarms() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllAlarms = async () => {
      setLoading(true);
      await axios
        .get(`${BASE_BACK}/alarms`)
        .then((response) => {
          setAlarms(response.data);
          console.log(response.data);
        })
        .finally(() => setLoading(false));
    };

    getAllAlarms();
  }, []);

  const activeAlarm = async (id: number) => {
    await axios.get(`${BASE_BACK}/alarms/active/${id}`).then((response) => {
      console.log(response.data);
    });
  };

  const formatTime = (timeString: Date): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <View className="flex-col w-full h-full items-center pt-14">
      <TitleAdd title="Alarm" />
      {!loading ? (
        alarms.map((alarm) => (
          <ConditionContainer
            key={alarm.id}
            blind={alarm.blind}
            curtain={alarm.curtain}
            days={alarm.days}
            one_time={alarm.one_time}
            active={alarm.active}
            onActive={() => {
              activeAlarm(alarm.id);
            }}
          >
            <Text
              style={{ ...Styles.title, fontSize: 35, color: "#7881ff" }}
              className="capitalize"
            >
              {formatTime(alarm.time)}
            </Text>
          </ConditionContainer>
        ))
      ) : (
        <View className="flex items-center justify-center w-full h-full">
          <ActivityIndicator size="large" color="#222" />
        </View>
      )}
    </View>
  );
}
