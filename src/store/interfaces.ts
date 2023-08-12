export interface TaskInterface {
  id: string;
  content: string;
  isCompleted?: boolean;
}

export interface ToDoStore {
  theme: "dark" | "light";
  taskList: TaskInterface[];
  isUpdating: boolean;
  taskToUpdate: TaskInterface;
}
