export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export const initialTasks: Task[] = [
  { id: 1, title: "Read the SIS 3 handout", done: false },
  { id: 2, title: "Build the task list screen", done: false },
  { id: 3, title: "Take a screenshot on the phone", done: false },
];