import React, { useState } from "react";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import { updateLocalStorage } from "./utils";
import ListWithTasks from "./components/ListWithTasks";
import EmptyList from "./components/EmptyList";
import Modal from "./components/Modal";

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

      if (parsedTask.id === taskToUpdate) {
        parsedTask.id = newText;
        parsedTask.text = newText;
      }
      parsedTask = JSON.stringify(parsedTask);
      return parsedTask;
    });
    updateLocalStorage(updatedList);
    setToDoList((prev: string[]) => (prev = updatedList));
  };

  return (
    <div className="bg-background-dark text-text-dark">
      <div className="flex flex-col items-center w-screen h-screen p-10">
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
          {isUpdating && (
            <EditTask
              setIsUpdating={setIsUpdating}
              prevTaskName={taskToUpdate}
              updateTaskHandler={updateTaskHandler}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
