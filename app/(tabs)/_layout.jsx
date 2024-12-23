// import { Tabs } from "expo-router";
// import React from "react";

// import { TabBarIcon } from "@/components/navigation/TabBarIcon";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import { Stack } from "expo-router";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "home" : "home-outline"}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="listDonHang"
//         options={{
//           title: "Đơn hàng",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "list" : "list-outline"}
//               color={color}
//             />
//           ),
//         }}
//       />
//       {/* <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "code-slash" : "code-slash-outline"}
//               color={color}
//             />
//           ),
//         }}
//       /> */}
//       {/* <Tabs.Screen
//         name="camera"
//         options={{
//           title: "Camera",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "camera" : "camera-outline"}
//               color={color}
//             />
//           ),
//         }}
//       /> */}
//       {/* <Tabs.Screen
//         name="map"
//         options={{
//           title: "Map",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "person" : "person-outline"}
//               color={color}
//             />
//           ),
//         }}
//       /> */}
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, Animated, Text } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#A0A4A8",
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      {[
        {
          name: "index",
          title: "Home",
          icon: "home",
          iconOutline: "home-outline",
        },
        {
          name: "listDonHang",
          title: "Đơn hàng",
          icon: "list",
          iconOutline: "list-outline",
        },
      ].map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabContainer, focused && styles.focusedTab]}>
                <Animated.View
                  style={[
                    styles.iconWrapper,
                    focused && styles.focusedIconWrapper,
                  ]}
                >
                  <TabBarIcon
                    name={focused ? tab.icon : tab.iconOutline}
                    color={focused ? "#fff" : color}
                  />
                </Animated.View>
                {focused && <Text style={styles.tabTitle}>{tab.title}</Text>}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: 60,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row", // Hiển thị theo hàng ngang
    width: 70,
  },
  focusedTab: {
    justifyContent: "flex-start", // Căn chỉnh sang trái khi focus
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  focusedIconWrapper: {
    backgroundColor: "#6a11cb",
    transform: [{ scale: 1.2 }],
    shadowColor: "#6a11cb",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  tabTitle: {
    marginLeft: 8, // Khoảng cách giữa icon và tên
    fontSize: 13,
    color: "#6a11cb", // Màu chữ khi focus
    fontWeight: "bold",
  },
});
