import { useRef } from "react";
import classes from "./NewListForm.module.css";

const NewListForm = ({ addNewListHandler }) => {
  const newListNameRef = useRef();

  const submitNewListHandler = event => {
    event.preventDefault();
    if (newListNameRef.current.value !== "") {
      addNewListHandler(newListNameRef.current.value);
    }
    newListNameRef.current.value = "";
  };

  return (
    <form onSubmit={submitNewListHandler} className={classes["new-list-form"]}>
      <input type="text" placeholder="Create new To Do List" ref={newListNameRef} />
      <button>+</button>
    </form>
  );
};

export default NewListForm;
