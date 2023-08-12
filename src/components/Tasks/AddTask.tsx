import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { genUniqueId, checkIfInputIsEmpty } from "../../utils";

import styles from "./AddTask.module.css";

const AddTask = () => {
  const currentList = useSelector((state: any) => state.toDo.taskList);

  const dispatch = useDispatch();
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
      content: taskName.trim(),
      isCompleted: false,
    };
    dispatch(actions.addTask(newTask));
    localStorage.setItem("currentList", JSON.stringify(currentList));
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
