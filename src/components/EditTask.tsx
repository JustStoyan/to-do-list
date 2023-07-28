import React, { useState } from "react";

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
    <div className="flex justify-center items-center h-screen w-screen absolute z-50 bg-[#020617] opacity-80">
      <div className="flex flex-col justify-center items-center gap-2 bg-[blue]  rounded-xl	  w-1/2 h-1/6">
        <h4 className="font-bold uppercase ">Edit</h4>
        <p>You can chagne the task from here: </p>
        <input
          type="text"
          value={task}
          onChange={updateTitleHandler}
          className="w-1/2 h-12 p-2 text-background-dark"
        />
        <div className="flex gap-2 p-4 text-xl font-semibold">
          <button onClick={updateAndCloseModal}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
