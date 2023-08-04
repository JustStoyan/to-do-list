import React from "react";
import styles from "./Input.module.css";

interface InputInterface {
  id?: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  defaultChecked?: boolean;
  className?: string;
  placeholder?: string;
}

export const Input = ({
  id,
  type,
  value,
  onChange,
  defaultChecked,
  className,
  placeholder,
}: InputInterface) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        className={`${styles["input"]} ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};
