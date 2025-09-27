import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { View } from "react-native";

function TabIcon({ focused, activeName, inactiveName }: any) {
  if (focused) {
    return (
      <LinearGradient
        colors={["#FFB800", "#FF8A00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex flex-row flex-1 h-[40px] w-[130px] min-h-[40px] mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Ionicons name={activeName} size={20} color="#151312" />
      </LinearGradient>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Ionicons name={inactiveName} size={20} color="#8D8BA7" />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeName="home"
              inactiveName="home-outline"
              title="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeName="bookmark"
              inactiveName="bookmark-outline"
              title="Save"
            />
          ),
        }}
      />
    </Tabs>
  );
}
