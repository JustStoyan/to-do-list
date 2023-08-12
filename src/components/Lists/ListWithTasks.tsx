import { useEffect } from "react";

import { updateListInLocalStorage } from "../../utils";
import Task from "../Tasks/Task";
import BinIcon from "../UI/Icons/BinIcon";
import EditIcon from "../UI/Icons/EditIcon";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

import styles from "./ListWithTasks.module.css";

const ListWithTasks = () => {
  const currentList = useSelector((state: any) => state.toDo.taskList);
  const dispatch = useDispatch();

  useEffect(() => {
    updateListInLocalStorage(currentList);
  }, [currentList, dispatch]);

  // Set the checkbox to be checked or unchecked and updates the list
  const changeCheckHandler = (e: any) => {
    dispatch(actions.changeCompleteStatus(e.target.id));
  };

  //Opens the update modal
  const triggerUpdateMode = (e: any) => {
    const id = e.target.id;
    const content = e.target.title;
    dispatch(actions.isEditing(true));
    dispatch(actions.setTaskToUpdate({ id, content }));
  };

  //Removes a task from the list
  const removeFromListHandler = (e: any) => {
    const currentTaskId = e.target.id;
    dispatch(actions.removeTask(currentTaskId));
  };

  return (
    <div>
      <ul className={styles["wrapper"]}>
        {currentList.map((task: any) => (
          <li
            className={styles["task-wrapper"]}
            key={task.id}
            id={task.id}
            value={task.content}
          >
            <Task
              onClick={changeCheckHandler}
              id={task.id}
              text={task.content}
              isChecked={task.isCompleted}
            />
            <div className={styles["actions"]}>
              <div
                className={styles["icon-wrapper"]}
                onClick={triggerUpdateMode}
                id={task.id}
                title={task.content}
              >
                <EditIcon />
              </div>
              <div
                className={styles["icon-wrapper"]}
                onClick={removeFromListHandler}
                id={task.id}
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
