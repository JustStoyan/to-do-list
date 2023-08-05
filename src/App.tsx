import React, { useState } from "react";
import AddTask from "./components/Tasks/AddTask";
import EditTask from "./components/Tasks/EditTask";
import { updateListInLocalStorage, updateThemeInLocalStorage } from "./utils";
import ListWithTasks from "./components/Lists/ListWithTasks";
import EmptyList from "./components/Lists/EmptyList";
import Modal from "./components/Lists/Modal";
import Header from "./components/Header";

import styles from "./App.module.css";

export interface TaskToUpdateInterface {
  id: string;
  text: string;
}

function App() {
  const listFromLocal = localStorage.getItem("currentList");

  const [toDoList, setToDoList] = useState<string[]>(
    (listFromLocal && JSON.parse(listFromLocal)) || []
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<TaskToUpdateInterface>({
    id: "",
    text: "",
  });

  //Update a certain toDo in the list.
  const updateTaskHandler = (newText: string) => {
    const updatedList: string[] = toDoList.map((task) => {
      let parsedTask = JSON.parse(task);

      if (parsedTask.id === taskToUpdate.id) {
        parsedTask.text = newText;
      }

      parsedTask = JSON.stringify(parsedTask);
      return parsedTask;
    });
    updateListInLocalStorage(updatedList);
    setToDoList((prev: string[]) => (prev = updatedList));
  };

  // Theme settings Start
  const currentTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(currentTheme || "light");
  updateThemeInLocalStorage(theme);

  const onSetThemeToDark = () => {
    updateThemeInLocalStorage("dark");
    setTheme("dark");
  };

  const onSetThemeToLight = () => {
    updateThemeInLocalStorage("light");
    setTheme("light");
  };
  // Theme settings End
  return (
    <div
      className={
        theme === "light" ? styles["app-theme-light"] : styles["app-theme-dark"]
      }
    >
      <div className={styles["app-wrapper"]}>
        <Header
          onThemeChangeDark={onSetThemeToDark}
          onThemeChangeLight={onSetThemeToLight}
          themeStatus={theme}
        />
        <AddTask setToDoList={setToDoList} />
        <Modal>
          {toDoList.length !== 0 ? (
            <ListWithTasks
              setIsUpdating={setIsUpdating}
              setTaskToUpdate={setTaskToUpdate}
              setToDoList={setToDoList}
              toDoList={toDoList}
            />
          ) : (
            <EmptyList />
          )}
        </Modal>
        {isUpdating && (
          <EditTask
            setIsUpdating={setIsUpdating}
            taskToUpdate={taskToUpdate}
            updateTaskHandler={updateTaskHandler}
            themeState={theme}
          />
        )}
      </div>
    </div>
  );
}

export default App;
