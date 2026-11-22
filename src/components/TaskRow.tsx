import { Pressable, StyleSheet, Text } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import type { Task } from "../data/tasks";

type TaskRowProps = {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
};

export default function TaskRow({ task, onPress, onDelete }: TaskRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_p, _t, swipeable) => (
          <Pressable
            onPress={() => {
              onDelete();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.meta}>{task.done ? "✓ Done" : "○ Open"}</Text>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    minHeight: 44,
  },
  cardPressed: { backgroundColor: "#e5e7eb" },
  title: { fontSize: 16, fontWeight: "bold" },
  meta: { marginTop: 4, color: "#4b5563", fontSize: 13 },
  action: {
    width: 100,
    marginVertical: 8,
    marginRight: 16,
    backgroundColor: "#b91c1c",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
  },
  actionText: { color: "#ffffff", fontWeight: "bold" },
});