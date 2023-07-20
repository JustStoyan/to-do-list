import { useRef } from "react";

const Form = (props: any) => {
  const toDoTitle = useRef<HTMLInputElement>(null);

  const updateListHandler = (e: any) => {
    e.preventDefault();

    console.log(toDoTitle.current?.value);

    toDoTitle.current?.value
      ? props.updateList((toDoList: string[]) => {
          const newList: string[] = { ...toDoList };
          {
            newList.push(toDoTitle.current?.value || "");
          }
          return newList;
        })
      : alert("Nothing to add");
  };
  return (
    <>
      <form onSubmit={updateListHandler}>
        <input type="text" placeholder="Add a to-do" ref={toDoTitle} />
        <button>Add</button>
      </form>
    </>
  );
};

export default Form;
