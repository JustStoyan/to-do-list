import React, { useState } from "react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { genUniqueId, checkIfInputIsEmpty } from "../../utils";

import styles from "./AddTask.module.css";

const AddTask = ({ setToDoList }: any) => {
  const [taskName, setTaskName] = useState("");

  const taskNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName((prev: string) => (prev = e.target.value));
  };

  const submitTaskNameHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (checkIfInputIsEmpty(taskName)) {
      return;
    }

    const id = genUniqueId(taskName.trim());
    const newTask = {
      id,
      text: taskName.trim(),
      isChecked: false,
    };

    setToDoList((prev: string[]) => {
      const newTaskList = [...prev];
      newTaskList.push(JSON.stringify(newTask));
      localStorage.setItem("currentList", JSON.stringify(newTaskList));
      return newTaskList;
    });
    setTaskName((prev) => (prev = ""));
  };

  return (
    <div>
      <form className={styles["wrapper"]} onSubmit={submitTaskNameHandler}>
        <Input
          className={styles["input"]}
          placeholder="Add your task from here"
          type="text"
          value={taskName}
          onChange={taskNameHandler}
        />
        <Button type="primary">Add</Button>
      </form>
    </div>
  );
};

export default AddTask;
