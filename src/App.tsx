import React, { useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import EditTask from "./components/EditTask";

function App() {
  const listFromLocal = localStorage.getItem("currentList");

  const newListItem = useRef<HTMLInputElement>(null);
  const [toDoList, setToDoList] = useState<string[]>(
    (listFromLocal && JSON.parse(listFromLocal)) || []
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState("");

  //Check if the toDo exists already
  const checkIfExists = (currentList: string[], task: string) => {
    console.log(currentList.indexOf(task));
    return currentList.indexOf(task);
  };

  const updateLocalStorage = (currentList: string[] | undefined) => {
    const toDoList = JSON.stringify(currentList);
    localStorage.setItem("currentList", toDoList);
  };

  //Add a new toDo to the list .
  const addToListHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setToDoList((prev: string[]) => {
      if (prev.length === 0) {
        const newList = [];
        newList.push(newListItem.current ? newListItem.current.value : "");
        updateLocalStorage(newList);
        const currentList = localStorage.getItem("currentList");
        const listToArray = JSON.parse(currentList ? currentList : "");
        return listToArray;
      } else {
        const newList = [...prev];

        if (
          newListItem.current &&
          checkIfExists(newList, newListItem.current.value) == -1
        ) {
          newList.push(newListItem.current.value);
        } else {
          alert(
            "You have added the same task already, complete that one first!"
          );
        }

        updateLocalStorage(newList);
        const currentList = localStorage.getItem("currentList");
        const listToArray = JSON.parse(currentList ? currentList : "");
        return listToArray;
      }
    });
  };

  //Update a certain toDo in the list.
  const updateTaskHandler = (newText: string) => {
    const oldTaskIndex = toDoList.indexOf(taskToUpdate);
    setToDoList((prev: string[]) => {
      const newList = prev.splice(oldTaskIndex, 1, newText);
      updateLocalStorage(prev);
      return prev;
    });
  };

  const triggerUpdateMode = (e: any) => {
    setIsUpdating((prev) => (prev = true));
    setTaskToUpdate((prev) => (prev = e.target.parentElement.parentElement.id));
  };

  //Remove from the list functionality
  const removeFromListHandler = (e: any) => {
    e.preventDefault();

    setToDoList((prev: string[]) => {
      const newState = prev.filter((element) => {
        return element != e.target.parentElement.parentElement.id;
      });
      updateLocalStorage(newState);
      return newState;
    });
  };

  return (
    <div className="App">
      <form onSubmit={addToListHandler}>
        <input type="text" ref={newListItem} />
        <button>Add</button>
      </form>

      <div>
        <ol className="flex justify-center items-center flex-col gap-3">
          {toDoList.map((toDo) => (
            <li className="flex flex-row gap-3" key={toDo} id={toDo}>
              {toDo}
              <div className="flex flex-row gap-1">
                <button onClick={triggerUpdateMode}>Edit</button>
                <button onClick={removeFromListHandler}>Delete</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {isUpdating && (
        <EditTask
          setIsUpdating={setIsUpdating}
          prevTaskName={taskToUpdate}
          updateTaskHandler={updateTaskHandler}
        />
      )}
    </div>
  );
}

export default App;
