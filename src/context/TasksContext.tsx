import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { initialTasks, type Task } from "../data/tasks";

type TasksContextValue = {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string) => {
    setTasks((current) => [
      ...current,
      { id: Date.now(), title: title.trim(), done: false },
    ]);
  };

  const removeTask = (id: number) => {
    setTasks((current) => current.filter((t) => t.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
}