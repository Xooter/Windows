import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Suse: require("../assets/fonts/suse/SUSE-Regular.ttf"),
    SuseBold: require("../assets/fonts/suse/SUSE-Bold.ttf"),
  });

  if (!fontsLoaded) return <View />;

  var screenOptions = {
    contentStyle: {
      backgroundColor: "#fff",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  };

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "ios",
      }}
    >
      <Stack.Screen name="index" options={screenOptions} />
    </Stack>
  );
}
