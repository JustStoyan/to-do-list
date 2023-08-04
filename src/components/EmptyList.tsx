import styles from './EmptyList.module.css'

const EmptyList = () => {
  return (
    <div className={styles['wrapper']}>
      <h1>Yey, there is nothing to do!!!</h1>
    </div>
  );
};

export default EmptyList;
