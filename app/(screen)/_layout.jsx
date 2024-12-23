import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      {/* <Stack.Screen name="onboarding" options={{ headerShown: false }} /> */}
      <Stack.Screen name="test" options={{ headerShown: false }} />
    </Stack>
  );
}
