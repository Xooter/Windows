import { useFonts } from "expo-font";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { TransitionPresets } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Styles } from "@/utils/Styles";

import Home from "./index";
import Alarms from "./rules";
import Rules from "./alarms";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Suse: require("../assets/fonts/suse/SUSE-Regular.ttf"),
    SuseBold: require("../assets/fonts/suse/SUSE-Bold.ttf"),
    SuseSemiBold: require("../assets/fonts/suse/SUSE-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const commonTabBarOptions: BottomTabNavigationOptions = {
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      display: "flex",
      position: "absolute",
      backgroundColor: "#fff",
      borderRadius: 10,
      height: 80,
      marginBottom: insets.bottom ? 0 : 15,
      marginHorizontal: 20,
      ...Styles.shadow,
    },
    tabBarShowLabel: false,
    headerShown: false,
  };

  const renderTabIcon = (
    IconComponent: any,
    iconName: string,
    label: string,
    size: number = 30,
  ) => {
    return ({ focused }: any) => (
      <View
        style={{ top: Platform.OS === "ios" ? 10 : 0, alignItems: "center" }}
      >
        <IconComponent
          name={iconName}
          size={size}
          color={focused ? "#7881ff" : "#565656"}
        />
        <Text
          style={{
            ...Styles.subtitle,
            fontSize: 15,
            opacity: 0.8,
            color: focused ? "#7881ff" : "#565656",
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        ...commonTabBarOptions,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="index"
    >
      <Tab.Screen
        name="alarms"
        component={Alarms}
        options={{
          tabBarIcon: renderTabIcon(Ionicons, "alarm", "Alarm", 35),
        }}
      />
      <Tab.Screen
        name="index"
        component={Home}
        options={{
          tabBarIcon: renderTabIcon(Entypo, "home", "Home"),
        }}
      />
      <Tab.Screen
        name="rules"
        component={Rules}
        options={{
          tabBarIcon: renderTabIcon(FontAwesome5, "pencil-ruler", "Rules"),
        }}
      />
    </Tab.Navigator>
  );
}
