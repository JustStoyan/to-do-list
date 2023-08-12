import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

import styles from "./EditTask.module.css";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { checkIfInputIsEmpty, updateListInLocalStorage } from "../../utils";

const EditTask = () => {
  //Collecting data from the Redux storage
  const currentTheme = useSelector((state: any) => state.toDo.theme);
  const taskToUpdate = useSelector((state: any) => state.toDo.taskToUpdate);
  const currentList = useSelector((state: any) => state.toDo.taskList);
  const dispatch = useDispatch();

  //Setting the state of the input field
  const [task, setTask] = useState(taskToUpdate.content || "");
  const updateTitleHandler = (e: any) => {
    setTask((prev: string) => (prev = e.target.value));
  };

  //Making sure that no empty fields are getting submited and updates the task while closing the edit mode
  const updateAndCloseModal = () => {
    if (checkIfInputIsEmpty(task)) {
      return;
    }

    dispatch(actions.editTask({ id: taskToUpdate.id, content: task }));
    dispatch(actions.isEditing(false));
    updateListInLocalStorage(currentList);
  };
  //Closes the edit mode only
  const closeModal = () => {
    dispatch(actions.isEditing(false));
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["background"]}>
        <div
          className={
            currentTheme === "light"
              ? `${styles["edit-window"]} ${styles["edit-window-light"]}`
              : `${styles["edit-window"]} ${styles["edit-window-dark"]}`
          }
        >
          <h4>Edit</h4>
          <p>You can change the task from here: </p>
          <Input type="text" value={task} onChange={updateTitleHandler} />
          <div
            className={
              currentTheme === "light"
                ? `${styles["actions"]} ${styles["actions-light"]}`
                : `${styles["actions"]}`
            }
          >
            <Button type="secondary" onAction={closeModal}>
              Cancel
            </Button>
            <Button type="secondary" onAction={updateAndCloseModal}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
