import styles from "./Header.module.css";

interface HeaderInterface {
  onThemeChangeDark: React.MouseEventHandler<HTMLParagraphElement>;
  onThemeChangeLight: React.MouseEventHandler<HTMLParagraphElement>;
  themeStatus: string;
}

const Header = ({
  onThemeChangeDark,
  onThemeChangeLight,
  themeStatus,
}: HeaderInterface) => {
  return (
    <header className={styles["wrapper"]}>
      <h1 className={styles["title"]}>To Do App</h1>
      <div className={styles["theme-switch"]}>
        <p
          className={themeStatus === "dark" ? styles["current-theme"] : ""}
          onClick={onThemeChangeDark}
        >
          Dark
        </p>
        <p
          className={themeStatus === "light" ? styles["current-theme"] : ""}
          onClick={onThemeChangeLight}
        >
          Light
        </p>
      </div>
    </header>
  );
};

export default Header;
