import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

import styles from "./EditTask.module.css";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { checkIfInputIsEmpty, updateListInLocalStorage } from "../../utils";

const EditTask = () => {
  const currentTheme = useSelector((state: any) => state.toDo.theme);
  const taskToUpdate = useSelector((state: any) => state.toDo.taskToUpdate);
  const currentList = useSelector((state: any) => state.toDo.taskList);

  const dispatch = useDispatch();
  const [task, setTask] = useState(taskToUpdate.content || "");

  const updateTitleHandler = (e: any) => {
    setTask((prev: string) => (prev = e.target.value));
  };

  const updateAndCloseModal = () => {
    if (checkIfInputIsEmpty(task)) {
      return;
    }

    dispatch(actions.editTask({ id: taskToUpdate.id, content: task }));
    dispatch(actions.isEditing(false));
    updateListInLocalStorage(currentList);
  };

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
