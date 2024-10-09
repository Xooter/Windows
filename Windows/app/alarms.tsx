import { ConditionContainer } from "@/components/ConditionContainer";
import { TitleAdd } from "@/components/TitleAdd";
import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  Vibration,
  View,
} from "react-native";
import { BASE_BACK } from "../secrets";
import { Alarm } from "@/models/Alarm";
import { Styles } from "@/utils/Styles";
import { AddAlarm } from "@/components/AddAlarm";

export default function Alarms() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletedAlarm, setDeletedAlarm] = useState<number>(-1);

  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);

  useEffect(() => {
    const getAllAlarms = async () => {
      setLoading(true);
      await axios
        .get(`${BASE_BACK}/alarms`)
        .then((response) => {
          setAlarms(response.data);
        })
        .finally(() => setLoading(false));
    };

    getAllAlarms();
  }, []);

  const activeAlarm = async (id: number) => {
    await axios.get(`${BASE_BACK}/alarms/active/${id}`);
  };

  const formatTime = (timeString: number): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const onNewAlarm = (alarm: Alarm) => {
    setAlarms([...alarms, alarm]);
  };

  const deleteAlarm = async () => {
    if (deletedAlarm === -1) return;

    await axios
      .delete(`${BASE_BACK}/alarms/${deletedAlarm}`)
      .then((response) => {
        setDeletedAlarm(-1);
        setAlarms(alarms.filter((alarm) => alarm.id !== response.data));
      });
  };

  const selectAlarm = (id: number) => {
    if (deletedAlarm === id) return;
    Vibration.vibrate(100);
    setDeletedAlarm(id);
  };

  const deselectAlarm = (id: number) => {
    if (deletedAlarm === -1) return;
    if (deletedAlarm == id) {
      setDeletedAlarm(-1);
    }
  };

  return (
    <View className="flex-col w-full h-full items-center pt-14">
      <TitleAdd
        title="Alarm"
        onPress={() => {
          if (deletedAlarm === -1) {
            setIsAddVisible(true);
          } else {
            deleteAlarm();
          }
        }}
        itemSelected={deletedAlarm}
      />

      {!loading ? (
        <ScrollView
          className="w-full"
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          {alarms.map((alarm) => (
            <MemoizedCard
              key={alarm.id}
              blind={alarm.blind}
              curtain={alarm.curtain}
              days={alarm.days}
              one_time={alarm.one_time}
              active={alarm.active}
              onActive={() => {
                activeAlarm(alarm.id);
              }}
              onLongPress={() => {
                selectAlarm(alarm.id);
              }}
              onPress={() => {
                deselectAlarm(alarm.id);
              }}
              selected={deletedAlarm === alarm.id}
            >
              <Text
                style={{
                  ...Styles.title,
                  fontSize: 35,
                  color: deletedAlarm !== alarm.id ? "#7881ff" : "#EB3678",
                }}
                className="capitalize"
              >
                {formatTime(alarm.time)}
              </Text>
            </MemoizedCard>
          ))}
        </ScrollView>
      ) : (
        <View className="flex items-center justify-center w-full h-full">
          <ActivityIndicator size="large" color="#222" />
        </View>
      )}

      <AddAlarm
        isAddVisible={isAddVisible}
        setIsAddVisible={setIsAddVisible}
        onNewAlarm={onNewAlarm}
      />
    </View>
  );
}

export const MemoizedCard = memo(ConditionContainer, (prevProps, nextProps) => {
  return prevProps.selected === nextProps.selected;
});
