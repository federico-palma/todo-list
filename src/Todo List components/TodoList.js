import { useRef, useState } from "react";
import TaskList from "./TaskList";
import classes from "./TodoList.module.css";

const TodoList = ({ listObject, updateListHandler, deleteListHandler }) => {
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

  const toggleCompletedTaskStatus = (currentList, index) => {
    let newListObject = listObject;
    let element;
    if (currentList === "completed-tasks") {
      element = newListObject.completedTasks.splice(index, 1);
      newListObject.tasks.push(element);
    } else {
      element = newListObject.tasks.splice(index, 1);
      newListObject.completedTasks.push(element);
    }
    updateListHandler(newListObject);
  };

  return (
    <div className={classes["todo-list"]}>
      <div className={classes["todo-header"]}>
        <h2>{listObject.title}</h2>
        <button onClick={() => deleteListHandler(listObject)}>X</button>
      </div>
      <TaskList
        listSource={listObject.tasks}
        toggleCompletedTaskStatus={toggleCompletedTaskStatus}
        listType="tasks"></TaskList>
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
        <TaskList
          listSource={listObject.completedTasks}
          toggleCompletedTaskStatus={toggleCompletedTaskStatus}
          listType="completed-tasks"></TaskList>
      )}
      <form className={classes["new-task-form"]} onSubmit={addNewTaskHandler}>
        <input ref={newTaskInputRef} type="text" placeholder="Add new task" />
        <button>+</button>
      </form>
    </div>
  );
};

export default TodoList;
