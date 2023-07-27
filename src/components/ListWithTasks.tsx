import { updateLocalStorage } from "../utils";
import Task from "./Task";

const ListWithTasks = ({
  setIsUpdating,
  setTaskToUpdate,
  setToDoList,
  toDoList,
}: any) => {
  // Set the checkbox to be checked or unchecked and updates the list
  const changeCheckHandler = (e: any) => {
    setToDoList((prev: string[]) => {
      const newList = prev.map((toDo: any) => {
        let task = JSON.parse(toDo);

        e.target.id === task.id && (task.isChecked = !task.isChecked);
        task = JSON.stringify(task);
        return task;
      });
      updateLocalStorage(newList);
      return newList;
    });
  };

  //Opens the update modal
  const triggerUpdateMode = (e: any) => {
    setIsUpdating((prev: boolean) => (prev = true));
    setTaskToUpdate((prev: string) => {
      return (prev = e.target.parentElement.parentElement.id);
    });
  };

  //Remove from the list functionality
  const removeFromListHandler = (e: any) => {
    setToDoList((prev: string[]) => {
      const newState = prev.filter((element) => {
        let objElement = JSON.parse(element);
        return objElement.id !== e.target.parentElement.parentElement.id;
      });
      updateLocalStorage(newState);
      return newState;
    });
  };

  const transoformedList = toDoList.map((toDo: any) => {
    return JSON.parse(toDo);
  });

  return (
    <div>
      <ul className="flex flex-col gap-1 p-2 pl-10  ">
        {transoformedList.map((toDo: any) => (
          <li className="flex flex-row gap-3" key={toDo.id} id={toDo.id}>
            <Task
              onClick={changeCheckHandler}
              id={toDo.id}
              text={toDo.text}
              isChecked={toDo.isChecked}
            />
            <div className="flex flex-row gap-1">
              <button onClick={triggerUpdateMode}>Edit</button>
              <button onClick={removeFromListHandler}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListWithTasks;
