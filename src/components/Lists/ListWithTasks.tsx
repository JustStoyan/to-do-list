import { updateListInLocalStorage } from "../../utils";
import Task from "../Tasks/Task";
import BinIcon from "../UI/Icons/BinIcon";
import EditIcon from "../UI/Icons/EditIcon";

import styles from "./ListWithTasks.module.css";

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
      updateListInLocalStorage(newList);
      return newList;
    });
  };

  //Opens the update modal
  const triggerUpdateMode = (e: any) => {
    setIsUpdating((prev: boolean) => (prev = true));
    setTaskToUpdate((prev: Object) => {
      return (prev = {
        id: e.target.id,
        text: e.target.title,
      });
    });
  };

  //Remove from the list functionality
  const removeFromListHandler = (e: any) => {
    setToDoList((prev: string[]) => {
      const newState = prev.filter((element) => {
        let objElement = JSON.parse(element);
        return objElement.id !== e.target.id;
      });
      updateListInLocalStorage(newState);
      return newState;
    });
  };

  const transoformedList = toDoList.map((toDo: any) => {
    return JSON.parse(toDo);
  });

  return (
    <div>
      <ul className={styles["wrapper"]}>
        {transoformedList.map((toDo: any) => (
          <li
            className={styles["task-wrapper"]}
            key={toDo.id}
            id={toDo.id}
            value={toDo.text}
          >
            <Task
              onClick={changeCheckHandler}
              id={toDo.id}
              text={toDo.text}
              isChecked={toDo.isChecked}
            />
            <div className={styles["actions"]}>
              <div
                className={styles["icon-wrapper"]}
                onClick={triggerUpdateMode}
                id={toDo.id}
                title={toDo.text}
              >
                <EditIcon />
              </div>
              <div
                className={styles["icon-wrapper"]}
                onClick={removeFromListHandler}
                id={toDo.id}
              >
                <BinIcon />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListWithTasks;
