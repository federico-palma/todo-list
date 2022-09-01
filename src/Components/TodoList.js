import { useRef, useState } from "react";
import classes from "./TodoList.module.css";

const TodoList = ({ listObject, updateListHandler }) => {
  const newTaskInputRef = useRef();
  const [showCompletedTasks, setShowCompletedTasks] = useState();
  // const [expandedList, setExpandedList] = useState(false);


  const addNewTaskHandler = event => {
    event.preventDefault();
    if (newTaskInputRef.current.value !== "") {
      let newListObject = listObject;
      newListObject.tasks.push(newTaskInputRef.current.value);
      updateListHandler(newListObject);
    }
    newTaskInputRef.current.value = "";
  };

  const toggleCompletedTaskStatus = (event, currentList, index) => {
    let newListObject = listObject;
    let element;
    if (currentList === "not-completed") {
      element = newListObject.tasks.splice(index, 1);
      newListObject.completedTasks.push(element);
    } else {
      element = newListObject.completedTasks.splice(index, 1);
      newListObject.tasks.push(element);
    }
    updateListHandler(newListObject);
  };

  return (
    <div className={classes["todo-list"]}>
      <h2>{listObject.title}</h2>
      <ul className={classes.tasks}>
        {listObject.tasks.map((elem, index) => {
          return (
            <li key={index} onClick={e => toggleCompletedTaskStatus(e, "not-completed", index)}>
              <p className={classes.task}>{elem}</p>
            </li>
          );
        })}
      </ul>
      <p
        onClick={() => setShowCompletedTasks(prevState => !prevState)}
        className={classes["toggle-complete"]}>
        {listObject.completedTasks.length > 0
          ? showCompletedTasks
            ? "- Hide completed tasks -"
            : "- Show completed tasks -"
          : ""}
      </p>
      {showCompletedTasks && listObject.completedTasks.length > 0 && (
        <ul className={classes["completed-tasks"]}>
          {listObject.completedTasks.map((elem, index) => {
            return (
              <li key={index} onClick={e => toggleCompletedTaskStatus(e, "completed", index)}>
                <p className={`${classes.task} ${classes.completed}`}>{elem}</p>
              </li>
            );
          })}
        </ul>
      )}
      <form className={classes["new-task-form"]} onSubmit={addNewTaskHandler}>
        <input ref={newTaskInputRef} type="text" placeholder="Add new task" />
        <button>+</button>
      </form>
    </div>
  );
};

export default TodoList;
