import { Fragment } from "react";
import { useSelector } from "react-redux";

import ListWithTasks from "./ListWithTasks";
import EmptyList from "./EmptyList";

export const List = () => {
  const taskList = useSelector((state: any) => state.toDo.taskList);
  return (
    <Fragment>
      {taskList && taskList.length > 0 ? <ListWithTasks /> : <EmptyList />}
    </Fragment>
  );
};
