import { useRef, useState } from "react";
import TaskList from "./TaskList";
import classes from "./TodoList.module.css";

const TodoList = ({
  listObject,
  updateListHandler,
  deleteListHandler,
  showExpandedListHandler,
}) => {
  const newTaskInputRef = useRef();
  const [showCompletedTasks, setShowCompletedTasks] = useState();

  const addNewTaskHandler = event => {
    event.preventDefault();
    if (newTaskInputRef.current.value.trim() !== "") {
      let newListObject = listObject;
      newListObject.createNewTask(newTaskInputRef.current.value);
      updateListHandler(newListObject);
    }
    newTaskInputRef.current.value = "";
  };

  const toggleCompletedTaskStatus = (currentList, index) => {
    let newListObject = listObject;
    newListObject.toggleTaskStatus(currentList, index);
    updateListHandler(newListObject);
  };

  return (
    <div
      className={classes["todo-list"]}
      onClick={() => {
        showExpandedListHandler(listObject);
      }}>
      <div className={classes["todo-header"]}>
        <h2>{listObject.title}</h2>
        <button
          onClick={e => {
            e.stopPropagation();
            deleteListHandler(listObject);
          }}>
          X
        </button>
      </div>
      <TaskList
        listSource={listObject.tasks}
        toggleCompletedTaskStatus={toggleCompletedTaskStatus}
        listType="tasks"></TaskList>
      <p
        onClick={e => {
          e.stopPropagation();
          setShowCompletedTasks(prevState => !prevState);
        }}
        className={classes["toggle-complete"]}>
        {listObject.completedTasks?.length > 0
          ? showCompletedTasks
            ? "- Hide completed tasks -"
            : "- Show completed tasks -"
          : ""}
      </p>
      {showCompletedTasks && listObject.completedTasks?.length > 0 && (
        <TaskList
          listSource={listObject.completedTasks}
          toggleCompletedTaskStatus={toggleCompletedTaskStatus}
          listType="completed"></TaskList>
      )}
      <form
        className={classes["new-task-form"]}
        onSubmit={addNewTaskHandler}
        onClick={e => {
          e.stopPropagation();
        }}>
        <input ref={newTaskInputRef} type="text" placeholder="Add new task" />
        <button>+</button>
      </form>
    </div>
  );
};

export default TodoList;
