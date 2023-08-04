import React from "react";
import styles from "./Button.module.css";

interface ButtonInterface {
  children: string;
  onAction?: React.MouseEventHandler<HTMLButtonElement>;
  type: "primary" | "secondary";
  
}

export const Button = ({ children, onAction, type }: ButtonInterface) => {
  return type === "primary" ? (
    <button className={styles["primary"]} onClick={onAction}>
      {children}
    </button>
  ) : (
    <button className={styles["secondary"]} onClick={onAction}>{children}</button>
  );
};


