export interface TaskInterface {
    id: string;
    isCompleted: boolean;
    content: string;
  }
  

export interface ToDoStore {
  theme: "dark" | "light";
  taskList: TaskInterface[];
  isUpdating: boolean
}


