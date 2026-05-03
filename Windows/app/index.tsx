import { SendButton } from "@/components/UI/SendButton";
import CustomSlider from "@/components/UI/Slider";
import { WeatherNow } from "@/components/WeatherNow";
import {
  Animated,
  Dimensions,
  ScrollView,
  Vibration,
  View,
} from "react-native";
import { TitleSlider } from "@/components/TitleSlider";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ToastManager, { Toast } from "toastify-react-native";
import CarouselSlider from "@/components/UI/CarouselSlider";

const { width } = Dimensions.get("window");

export default function Index() {
  type CurrentValues = {
    curtain: number;
    blind: number;
  };

  const [blindValue, setBlindValue] = useState<number>(0);
  const [curtainValue, setCurtainValue] = useState<number>(0);
  const [sending, setSending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentValues, setCurrentValues] = useState<CurrentValues>({
    curtain: 0,
    blind: 0,
  });

  const scrollRef = useRef<ScrollView>(null);
  const [_, setCurrentPage] = useState(0);
  const [scrollX] = useState(new Animated.Value(0));

  const handlePageChange = (e: any) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  useEffect(() => {
    const getInfo = async () => {
      await axios
        .get(`http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002`, {
          timeout: 3000,
        })
        .then((response) => {
          setCurrentValues(response.data);
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.log("Request timed out");
          } else {
            Toast.error("Server is not available");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getInfo();
  }, []);

  const sendValues = async () => {
    const dataValues = {
      curtain: curtainValue / 100,
      blind: blindValue / 100,
    };
    setSending(true);
    axios
      .post(
        `http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002`,
        dataValues,
      )
      .then((response) => {
        Vibration.vibrate([100, 1, 100, 1]);
        console.log(response.data);
        setCurrentValues(dataValues);
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <View className="flex-col h-full items-center gap-y-5">
      <ToastManager />
      <WeatherNow />

      <CarouselSlider scrollX={scrollX} />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageChange}
        style={{ width }}
        contentContainerStyle={{ width: width * 2 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Página 1 — Curtain */}
        <View style={{ width }} className="flex-col items-center gap-y-5 pt-2">
          <TitleSlider text="Curtain" porcentage={curtainValue} />
          <CustomSlider
            minValue={0}
            maxValue={100}
            currentValue={0}
            progressValue={currentValues.curtain}
            onValueChange={(value: number) => setCurtainValue(value)}
            steps={5}
          />

          <TitleSlider text="Blind" porcentage={blindValue} />
          <CustomSlider
            minValue={0}
            maxValue={100}
            currentValue={0}
            progressValue={currentValues.blind}
            onValueChange={(value: number) => setBlindValue(value)}
            steps={5}
          />
          <SendButton
            text="Send"
            loading={sending}
            onPress={sendValues}
            disabled={loading}
          />
        </View>

        <View
          style={{ width }}
          className="flex-col items-center gap-y-5 pt-2"
        ></View>
      </ScrollView>
    </View>
  );
}
