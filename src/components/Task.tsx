import React from "react";

interface TaskInterface {
  id: string;
  text: string;
  isChecked: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

const Task = ({ id, text, isChecked = false, onClick }: TaskInterface) => {
  return (
    <div
      className={
        isChecked
          ? "flex gap-2 justify-center items-center text-[26px] opacity-50 line-through"
          : "flex gap-2 justify-center items-center text-[26px]"
      }
    >
      <input
        className="scale-150"
        onClick={onClick}
        type="checkbox"
        id={id}
        defaultChecked={isChecked}
      />
      <label className="italic font-bold" htmlFor={id}>
        {text}
      </label>
    </div>
  );
};

export default Task;
