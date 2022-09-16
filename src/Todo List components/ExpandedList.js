import { useRef, useState } from "react";
import classes from "./TodoList.module.css";

import TaskList from "./TaskList";

const ExpandedList = ({
  listObject,
  updateListHandler,
  deleteListHandler,
  closeExpandedListHandler,
}) => {
  const newTaskInputRef = useRef();
  const [showCompletedTasks, setShowCompletedTasks] = useState();

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
    if (currentList === "completed") {
      element = newListObject.completedTasks.splice(index, 1);
      newListObject.tasks.push(element);
    } else {
      element = newListObject.tasks.splice(index, 1);
      newListObject.completedTasks.push(element);
    }
    updateListHandler(newListObject);
  };

  return (
    <div className={classes["expanded-list-container"]} onClick={closeExpandedListHandler}>
      <div className={classes["expanded-list"]} onClick={e => e.stopPropagation()}>
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
        <form className={classes["new-task-form"]} onSubmit={addNewTaskHandler}>
          <input ref={newTaskInputRef} type="text" placeholder="Add new task" />
          <button>+</button>
        </form>
      </div>
    </div>
  );
};

export default ExpandedList;
