import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTasks } from "../../src/context/TasksContext";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, removeTask } = useTasks();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Task not found" }} />
        <Text style={styles.title}>Task not found</Text>
        <Text>No task with id {id}.</Text>
      </View>
    );
  }

  function handleDelete() {
    if (!task) return;
    removeTask(task.id);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: task.title }} />
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.meta}>{task.done ? "✓ Done" : "○ Open"}</Text>

      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => [
          styles.deleteBtn,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.deleteText}>Delete task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 95,
    paddingBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  meta: { fontSize: 16, color: "#4b5563", marginBottom: 24 },
  deleteBtn: {
    paddingVertical: 14,
    backgroundColor: "#b91c1c",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
});