import styles from "./ListLayout.module.css";

export const ListLayout = (props: any) => {
  return <div className={styles["wrapper"]}>{props.children}</div>;
};

export default ListLayout;
