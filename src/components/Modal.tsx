import styles from './Modal.module.css';


const Modal = (props: any) => {
  return <div className={styles['wrapper']}>{props.children}</div>;
};

export default Modal;
