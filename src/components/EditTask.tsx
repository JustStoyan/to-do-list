import React, { useState } from "react";

interface EditProps {
  prevTaskName: string;
  setIsUpdating: Function;
  updateTaskHandler: Function;

}

const EditTask = ({prevTaskName,setIsUpdating,updateTaskHandler}:Partial<EditProps>) => {
  const [task, setTask] = useState(prevTaskName || '')

  const updateTitleHandler = (e: any) => {
    prevTaskName && setTask((prev: string) => (prev = e.target.value));
  };
 
  const updateAndCloseModal = () => {
    updateTaskHandler && updateTaskHandler(task);
    setIsUpdating && setIsUpdating(false);
  }

  const closeModal = () => {
    setIsUpdating && setIsUpdating(false)
  }

  return (
    <div>
      <input type="text" value={task} onChange={updateTitleHandler} />
      <div>
        <button onClick={updateAndCloseModal}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTask;
