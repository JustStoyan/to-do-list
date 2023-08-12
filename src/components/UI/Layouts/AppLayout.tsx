import { useSelector } from "react-redux";

import styles from "./AppLayout.module.css";

export const AppLayout = ({ children }: any) => {
  const currentTheme = useSelector((state: any) => state.toDo.theme);
  return (
    <div
      className={`${styles["app-wrapper"]} ${
        currentTheme === "light"
          ? styles["app-theme-light"]
          : styles["app-theme-dark"]
      } `}
    >
      {children}
    </div>
  );
};
