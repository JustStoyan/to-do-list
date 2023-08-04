import React, { useState } from "react";
import styles from "./EditTask.module.css";
import { Button } from "./UI/Button";

interface EditProps {
  prevTaskName: string;
  setIsUpdating: Function;
  updateTaskHandler: Function;
}

const EditTask = ({
  prevTaskName,
  setIsUpdating,
  updateTaskHandler,
}: Partial<EditProps>) => {
  const [task, setTask] = useState(prevTaskName || "");

  const updateTitleHandler = (e: any) => {
    prevTaskName && setTask((prev: string) => (prev = e.target.value));
  };

  const updateAndCloseModal = () => {
    updateTaskHandler && updateTaskHandler(task);
    setIsUpdating && setIsUpdating(false);
  };

  const closeModal = () => {
    setIsUpdating && setIsUpdating(false);
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['edit-window']}>
        <h4>Edit</h4>
        <p>You can chagne the task from here: </p>
        <input type="text" value={task} onChange={updateTitleHandler} />
        <div>
          <Button type="secondary" onAction={updateAndCloseModal}>Save</Button>
          <Button type="secondary" onAction={closeModal}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
