import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useTasks } from "../src/context/TasksContext";

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSave() {
    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    addTask(title);
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Task title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Read SIS 3 handout"
          autoFocus
          returnKeyType="done"
          onSubmitEditing={handleSave}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  label: { fontSize: 14, color: "#4b5563", marginBottom: 8 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  error: { color: "#b91c1c", marginBottom: 12 },
  saveBtn: {
    paddingVertical: 14,
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
});