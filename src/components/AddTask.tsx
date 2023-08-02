import React, { useState } from "react";

const AddTask = (props: any) => {
  const [taskName, setTaskName] = useState("");

  const taskNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName((prev: string) => (prev = e.target.value));
  };

  const submitTaskNameHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newTask = {
      id: taskName,
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
      <form onSubmit={submitTaskNameHandler} >
        <input
         
          type="text"
          value={taskName}
          onChange={taskNameHandler}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddTask;
