import { actions } from "../store";
import styles from "./Header.module.css";

import { updateThemeInLocalStorage } from "../utils";

import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: any) => state.toDo.theme);

  const changeThemeToDark = () => {
    dispatch(actions.changeTheme("dark"));
    updateThemeInLocalStorage("dark");
  };

  const changeThemeToLight = () => {
    dispatch(actions.changeTheme("light"));
    updateThemeInLocalStorage("light");
  };

  return (
    <header className={styles["wrapper"]}>
      <h1 className={styles["title"]}>To Do App</h1>
      <div className={styles["theme-switch"]}>
        <p
          className={currentTheme === "dark" ? styles["current-theme"] : ""}
          onClick={changeThemeToDark}
        >
          Dark
        </p>
        <p
          className={currentTheme === "light" ? styles["current-theme"] : ""}
          onClick={changeThemeToLight}
        >
          Light
        </p>
      </div>
    </header>
  );
};

export default Header;
