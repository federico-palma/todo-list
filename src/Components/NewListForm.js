import { useRef } from "react";
import classes from "./NewListForm.module.css";

const NewListForm = ({ addNewListHandler }) => {
  const newListNameRef = useRef();

  const submitNewListHandler = event => {
    event.preventDefault();

    addNewListHandler(newListNameRef.current.value)
  };

  return (
    <form onSubmit={submitNewListHandler} className={classes["new-list-form"]}>
      <input type="text" placeholder="Create new To Do List" ref={newListNameRef} />
      <button>Create</button>
    </form>
  );
};

export default NewListForm;
