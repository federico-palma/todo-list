import { useRef } from "react";
import classes from "./TodoList.module.css";

const TodoList = ({ listObject, updateListHandler }) => {
  const newTaskInputRef = useRef();

  const addNewTaskHandler = event => {
    event.preventDefault();
    if (newTaskInputRef.current.value !== "") {
      let newListObject = listObject;
      newListObject.todoArray.push(newTaskInputRef.current.value);
      updateListHandler(newListObject);
    }
    newTaskInputRef.current.value = "";
  };

  return (
    <div className={classes["todo-list"]}>
      <h2>{listObject.title}</h2>
      <ul>
        {listObject.todoArray.map((elem, index) => {
          return <li key={index}>{elem}</li>;
        })}
      </ul>
      <form onSubmit={addNewTaskHandler}>
        <input ref={newTaskInputRef} type="text" placeholder="Add new task" />
        <button>+</button>
      </form>
    </div>
  );
};

export default TodoList;
