import { useRef, useState } from "react";
import classes from "./TodoList.module.css";

import TaskList from "./TaskList";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const ExpandedList = ({
  listObject,
  updateListHandler,
  deleteExpListHandler,
  closeExpandedListHandler,
}) => {
  const newTaskInputRef = useRef();
  const [showCompletedTasks, setShowCompletedTasks] = useState();

  const addNewTaskHandler = event => {
    event.preventDefault();
    if (newTaskInputRef.current.value.trim() !== "") {
      console.log(listObject);
      let newListObject = listObject;
      newListObject.createNewTask(newTaskInputRef.current.value);
      updateListHandler(newListObject);
    }
    newTaskInputRef.current.value = "";
  };

  const deleteTaskHandler = (currentList, index) => {
    let newListObject = listObject;
    newListObject.deleteTask(currentList, index);
    updateListHandler(newListObject);
  };

  const toggleCompletedTaskStatus = (currentList, index) => {
    let newListObject = listObject;
    newListObject.toggleTaskStatus(currentList, index);
    updateListHandler(newListObject);
  };

  // Edit list header and tasks, delete task if text content is empty.
  const editHeaderHandler = event => {
    let newListObject = listObject;
    if (event.target.innerText === "") {
      newListObject.title = "Unnamed List";
      updateListHandler(newListObject);
    } else if (event.target.innerText !== newListObject.title) {
      newListObject.title = event.target.innerText;
      updateListHandler(newListObject);
    }
  };

  const editTaskHandler = (event, currentList, index) => {
    let newListObject = listObject;
    let newTaskContent = event.target.innerText;
    if (newTaskContent === "") {
      if (currentList === "completed") {
        newListObject.completedTasks.splice(index, 1);
      } else {
        newListObject.tasks.splice(index, 1);
      }
    } else {
      if (currentList === "completed") {
        newListObject.completedTasks.splice(index, 1, newTaskContent);
      } else {
        newListObject.tasks.splice(index, 1, newTaskContent);
      }
    }
    updateListHandler(newListObject);
  };

  return (
    <div className={classes["expanded-list-container"]} onMouseDown={closeExpandedListHandler}>
      <div className={classes["expanded-list"]} onMouseDown={e => e.stopPropagation()}>
        <div className={classes["todo-header"]}>
          <div
            contentEditable={true}
            className={classes["expanded-list-title"]}
            onBlur={editHeaderHandler}
            onKeyDown={(e) => {if (e.key === "Enter") e.currentTarget.blur()}}
            suppressContentEditableWarning={true}>
            {listObject.title}
          </div>
          <button onClick={() => deleteExpListHandler(listObject)}>
            <CloseIcon sx={{ fontSize: "20px" }} />
          </button>
        </div>
        <div className={classes["expanded-tasks-container"]}>
          <TaskList
            listSource={listObject.tasks}
            toggleCompletedTaskStatus={toggleCompletedTaskStatus}
            deleteTaskHandler={deleteTaskHandler}
            listType="tasks"
            expandedList={true}
            editTaskHandler={editTaskHandler}></TaskList>
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
              deleteTaskHandler={deleteTaskHandler}
              listType="completed"
              expandedList={true}
              editTaskHandler={editTaskHandler}></TaskList>
          )}
        </div>
        <form className={classes["new-task-form"]} onSubmit={addNewTaskHandler}>
          <input ref={newTaskInputRef} type="text" placeholder="Add new task" />
          <button>
            <AddIcon sx={{ fontSize: "20px" }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpandedList;
