import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTasks } from "../src/context/TasksContext";
import TaskRow from "../src/components/TaskRow";

export default function TasksScreen() {
  const { tasks, removeTask } = useTasks();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("/new")}
        style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.addText}>+ New task</Text>
      </Pressable>

      <Text style={styles.hint}>Swipe a task left to delete it</Text>

      {tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks yet. Add one above.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(t) => String(t.id)}
          renderItem={({ item }) => (
            <TaskRow
              task={item}
              onPress={() => router.push(`/tasks/${item.id}`)}
              onDelete={() => removeTask(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", paddingTop: 90 },
  addButton: {
    marginHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
  hint: { padding: 16, color: "#4b5563", fontSize: 13 },
  empty: { textAlign: "center", color: "#4b5563", marginTop: 32 },
});