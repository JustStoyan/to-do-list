//Update and set localStorage array
export const updateLocalStorage = (currentList: string[] | undefined) => {
  const toDoList = JSON.stringify(currentList);
  localStorage.setItem("currentList", toDoList);
};

//Check if the toDo exists already
export const checkIfExists = (currentList: string[], task: string) => {
  console.log(currentList.indexOf(task));
  return currentList.indexOf(task);
};
