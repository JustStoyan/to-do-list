import React, { useState } from "react";


const EditTask = (currentTask: any, updateHandler: any) => {
  const [task, setTask] = useState("");

  
const updateTaskHandler = (e: any) => {
    setTask((prev: string) => (prev = e.target.value));
  };

  setTask(currentTask);
  return (
    <div>
      <input type="text" value={task} onChange={updateTaskHandler} />
      <div>
        <button onClick={updateHandler(task)}>Save</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default EditTask;
