import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TasksProvider } from "../src/context/TasksContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TasksProvider>
          <Stack>
            <Stack.Screen name="index" options={{ title: "Tasks" }} />
            <Stack.Screen 
  name="new" 
  options={{ 
    title: "New task", 
    presentation: "modal",
    animation: "slide_from_bottom" 
  }} 
/>
            <Stack.Screen name="tasks/[id]" options={{ title: "Task" }} />
          </Stack>
        </TasksProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}