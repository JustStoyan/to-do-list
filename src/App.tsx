import React, { useState } from "react";
import AddTask from "./components/Tasks/AddTask";
import EditTask from "./components/Tasks/EditTask";
import { updateListInLocalStorage } from "./utils";
import ListWithTasks from "./components/Lists/ListWithTasks";
import EmptyList from "./components/Lists/EmptyList";
import ListLayout from "./components/UI/Layouts/ListLayout";
import { AppLayout } from "./components/UI/Layouts/AppLayout";
import Header from "./components/Header";

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

  return (
    <AppLayout>
        <Header />
        <AddTask setToDoList={setToDoList} />
        <ListLayout>
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
        </ListLayout>
        {isUpdating && (
          <EditTask
            setIsUpdating={setIsUpdating}
            taskToUpdate={taskToUpdate}
            updateTaskHandler={updateTaskHandler}
          />
        )}
      </AppLayout>
  );
}

export default App;
