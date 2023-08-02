import React from "react";

interface TaskInterface {
  id: string;
  text: string;
  isChecked: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

const Task = ({ id, text, isChecked = false, onClick }: TaskInterface) => {
  return (
    <div>
      <input
        onClick={onClick}
        type="checkbox"
        id={id}
        defaultChecked={isChecked}
      />
      <label htmlFor={id}>{text}</label>
    </div>
  );
};

export default Task;
