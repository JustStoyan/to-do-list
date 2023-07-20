import React, { useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import EditTask from "./components/EditTask";

function App() {
  const newListItem = useRef<HTMLInputElement>(null);
  const [toDoList, setToDoList] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  //Check if the toDo exists already
  const checkIfExists = (currentList: string[], task: string) => {
    console.log(currentList.indexOf(task));
    return currentList.indexOf(task);
  };

  //Add a new toDo to the list .
  const addToListHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setToDoList((prev: string[]) => {
      if (prev.length === 0) {
        const newList = [];
        newList.push(newListItem.current ? newListItem.current.value : "");
        return newList;
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

        return newList;
      }
    });
  };

  //Update a certain toDo in the list.
  const updateTaskHandler = (
    e: any,
    newText: string
  ) => {
    const oldTaskIndex = toDoList.indexOf(e.target.parentElement.parentElement.id);
    setToDoList((prev: string[]) => prev.splice(oldTaskIndex, 1, newText));
  };

  const triggerUpdateMode = (e: any) => {
    const currentTask: string = e.target.parentElement.parentElement.id;
    setIsUpdating((prev) => (prev = true));

   
      <EditTask currentTask={currentTask} updateHandler={updateTaskHandler} />
    
  };

  //Remove from the list functionality
  const removeFromListHandler = (e: any) => {
    e.preventDefault();

    setToDoList((prev: string[]) => {
      const newState = prev.filter((element) => {
        return element != e.target.parentElement.parentElement.id;
      });
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
        <ol>
          {toDoList.map((toDo) => (
            <li key={toDo} id={toDo}>
              {toDo}
              <span>
                <button onClick={triggerUpdateMode}>Edit</button>
                <button onClick={removeFromListHandler}>Delete</button>
              </span>
            </li>
          ))}
        </ol>
      </div>
      {isUpdating && <EditTask/>}
    </div>
  );
}

export default App;
