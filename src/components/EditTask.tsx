import React, { useState } from "react";
import styles from "./EditTask.module.css";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";
import { TaskToUpdateInterface } from "../App";
import { checkIfInputIsEmpty } from "../utils";

interface EditProps {
  taskToUpdate: TaskToUpdateInterface;
  setIsUpdating: Function;
  updateTaskHandler: Function;
  themeState: string;
}

const EditTask = ({
  taskToUpdate,
  setIsUpdating,
  updateTaskHandler,
  themeState,
}: Partial<EditProps>) => {
  const [task, setTask] = useState(taskToUpdate?.text || "");

  const updateTitleHandler = (e: any) => {
    setTask((prev: string) => (prev = e.target.value));
  };

  const updateAndCloseModal = () => {
    if (checkIfInputIsEmpty(task)) {
      return;
    }

    updateTaskHandler && updateTaskHandler(task);
    setIsUpdating && setIsUpdating(false);
  };

  const closeModal = () => {
    setIsUpdating && setIsUpdating(false);
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["background"]}>
        <div
          className={
            themeState === "light"
              ? `${styles["edit-window"]} ${styles["edit-window-light"]}`
              : `${styles["edit-window"]} ${styles["edit-window-dark"]}`
          }
        >
          <h4>Edit</h4>
          <p>You can change the task from here: </p>
          <Input type="text" value={task} onChange={updateTitleHandler} />
          <div
            className={
              themeState === "light"
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
