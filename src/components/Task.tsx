import React from "react";
import styles from "./Task.module.css";

interface TaskInterface {
  id: string;
  text: string;
  isChecked: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

const Task = ({ id, text, isChecked = false, onClick }: TaskInterface) => {
  return (
    <div className={styles["wrapper"]}>
      <input
        className={styles["checkbox"]}
        onClick={onClick}
        type="checkbox"
        id={id}
        defaultChecked={isChecked}
      />
      <label className={styles["label"]} htmlFor={id}>
        {text}
      </label>
    </div>
  );
};

export default Task;
