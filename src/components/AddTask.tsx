import React, { useState } from "react";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";

import styles from './AddTask.module.css'

const AddTask = (props: any) => {
  const [taskName, setTaskName] = useState("");

  const taskNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName((prev: string) => (prev = e.target.value));
  };

  const submitTaskNameHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const timestamp = new Date().valueOf();
    const id = taskName + timestamp;

    const newTask = {
      id,
      text: taskName,
      isChecked: false,
    };

    props.setToDoList((prev: string[]) => {
      const newTaskList = [...prev];
      newTaskList.push(JSON.stringify(newTask));
      localStorage.setItem("currentList", JSON.stringify(newTaskList));
      return newTaskList;
    });
    setTaskName((prev) => (prev = ""));
  };

  return (
    <div>
      <form className={styles['wrapper']} onSubmit={submitTaskNameHandler}>
        <Input className={styles['input']}  placeholder= "Add your task from here" type="text" value={taskName} onChange={taskNameHandler} />
        <Button type="primary">Add</Button>
      </form>
    </div>
  );
};

export default AddTask;
