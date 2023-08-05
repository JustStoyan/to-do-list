//Update and set localStorage array of toDo tasks
export const updateListInLocalStorage = (currentList: string[] | undefined) => {
  const toDoList = JSON.stringify(currentList);
  localStorage.setItem("currentList", toDoList);
};

//Update theme in localStorage
export const updateThemeInLocalStorage = (theme: string) => {
  localStorage.setItem("theme", theme);
};

//Check if the input field is empty
export const checkIfInputIsEmpty = (inputValue: string) => {
  return inputValue.trim().length <= 0 ? true : false;
};

//Generates a unique ID
export const genUniqueId = (taskName: string) => {
  return new Date().valueOf() + taskName;
};
