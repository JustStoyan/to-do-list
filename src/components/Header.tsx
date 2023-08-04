import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles["wrapper"]}>
      <h1 className={styles["title"]}>To Do App</h1>
      <div className={styles["theme-switch"]}>
        <p>Dark</p>
        <p>Light</p>
      </div>
    </header>
  );
};

export default Header;
