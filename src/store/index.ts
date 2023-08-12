import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { TaskInterface, ToDoStore } from "./interfaces";

const currentTaskList: any = localStorage.getItem("currentList");
const currentTasks =
  currentTaskList && JSON.parse(currentTaskList).map((task: any) => task);

const currentTheme: any = localStorage.getItem("theme");

const initialState: ToDoStore = {
  theme: currentTheme ? currentTheme : "light",
  taskList: currentTaskList && currentTaskList.length === 0 ? [] : currentTasks,
  isUpdating: false,
  taskToUpdate: {
    id: "",
    content: "",
  },
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      const newTheme: "dark" | "light" = action.payload;
      state.theme = newTheme;
    },
    addTask: (state, action) => {
      const newTask: TaskInterface = action.payload;
      if (!state.taskList) {
        state.taskList = [newTask];
      } else {
        state.taskList = [...state.taskList, newTask];
      }
    },
    removeTask: (state, action) => {
      const taskId: any = action.payload;
      state.taskList = state.taskList.filter((task) => task.id !== taskId);
    },
    editTask: (state, action) => {
      const newTask = { ...action.payload };
      const newTaskList = state.taskList.map((task) => {
        if (task.id === newTask.id) {
          task.content = newTask.content;
          return task;
        } else {
          return task;
        }
      });

      state.taskList = [...newTaskList];
    },
    isEditing: (state, action) => {
      state.isUpdating = action.payload;
    },
    setTaskToUpdate: (state, action) => {
      const currentTask: TaskInterface = { ...action.payload };
      state.taskToUpdate = currentTask;
    },
  },
});

export const actions = toDoSlice.actions;
export const store = configureStore({
  reducer: {
    toDo: toDoSlice.reducer,
  },
});
