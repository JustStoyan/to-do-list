import React, { useState } from "react";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import { updateLocalStorage } from "./utils";
import ListWithTasks from "./components/ListWithTasks";
import EmptyList from "./components/EmptyList";
import Modal from "./components/Modal";
import Header from "./components/Header";

import styles from "./App.module.css";

function App() {
  const listFromLocal = localStorage.getItem("currentList");

  const [toDoList, setToDoList] = useState<string[]>(
    (listFromLocal && JSON.parse(listFromLocal)) || []
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState("");

  //Update a certain toDo in the list.
  const updateTaskHandler = (newText: string) => {
    const updatedList: string[] = toDoList.map((task, index) => {
      let parsedTask = JSON.parse(task);
      console.log( parsedTask.id)
      console.log(taskToUpdate)

      if (parsedTask.id === taskToUpdate) {
        parsedTask.text = newText;
        
      }
      
      parsedTask = JSON.stringify(parsedTask);
      return parsedTask;
    });
    updateLocalStorage(updatedList);
    setToDoList((prev: string[]) => (prev = updatedList));
  };

  return (
    <div className={styles["app-themes-light"]}>
      <div className={styles["app-wrapper"]}>
        <Header/>
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
            prevTaskName={taskToUpdate}
            updateTaskHandler={updateTaskHandler}
          />
        )}
      </div>
    </div>
  );
}

export default App;
