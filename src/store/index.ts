import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { TaskInterface, ToDoStore } from "./interfaces";

const currentTaskList: any = localStorage.getItem("currentList");
const currentTasks =
  currentTaskList &&
  JSON.parse(currentTaskList).map((task: any) => JSON.parse(task));

const currentTheme: any = localStorage.getItem("theme");

const initialState: ToDoStore = {
  theme: currentTheme ? currentTheme : "light",
  taskList: currentTaskList && currentTaskList.length === 0 ? [] : currentTasks,
  isUpdating: false,
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
      state.taskList = [...state.taskList, newTask];
    },
    removeTask: (state, action) => {
      const taskId: any = action.payload;
      state.taskList = state.taskList.filter(taskId);
    },
    editTask: (state, action) => {
      const [index, content] = [...action.payload];
      state.taskList[index].content = content;
    },
    isEditing: (state, action) => {
      state.isUpdating = action.payload;
    },
  },
});

export const actions = toDoSlice.actions;
export const store = configureStore({
  reducer: {
    toDo: toDoSlice.reducer,
  },
});
