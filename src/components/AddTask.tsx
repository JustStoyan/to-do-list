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
    <div className=" flex justify-center items-center w-screen border h-[20%] ">
      <form onSubmit={submitTaskNameHandler} className="flex gap-3">
        <input
          className="border-2 text-xl p-2 w-[24rem] h-[3.5rem] bg-background-dark"
          type="text"
          value={taskName}
          onChange={taskNameHandler}
        />
        <button className="text-2xl font-bold uppercase">Add</button>
      </form>
    </div>
  );
};

export default AddTask;
