import AddTask from "./components/Tasks/AddTask";
import EditTask from "./components/Tasks/EditTask";

import ListLayout from "./components/UI/Layouts/ListLayout";
import { AppLayout } from "./components/UI/Layouts/AppLayout";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { Lists } from "./components/Lists/";



function App() {
  const isUpdating = useSelector((state: any) => state.toDo.isUpdating);

  return (
    <AppLayout>
      <Header />
      <AddTask />
      <ListLayout>
        <Lists />
      </ListLayout>
      {isUpdating && <EditTask />}
    </AppLayout>
  );
}

export default App;
