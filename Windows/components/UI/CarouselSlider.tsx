import { View, Animated, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

interface Props {
  scrollX: Animated.Value;
}
const CarouselSlider = ({ scrollX }: Props) => {
  const indicatorLeft = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: ["2%", "52%"],
    extrapolate: "clamp",
  });
  return (
    <View className="flex flex-row w-[80%] space-x-2 mt-2">
      <Animated.View
        style={{
          position: "absolute",
          left: indicatorLeft,
          zIndex: 2,
          width: "48%",
          height: "100%",
          backgroundColor: "#7881ff",
          borderRadius: 99,
        }}
      />
      <View className="h-1 flex-1 bg-[#c3c3c3] rounded-xl" />
      <View className="h-1 flex-1 bg-[#c3c3c3] rounded-xl" />
    </View>
  );
};

export default CarouselSlider;
