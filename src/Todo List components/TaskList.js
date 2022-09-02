import classes from "./TodoList.module.css";

const TaskList = ({ listSource, toggleCompletedTaskStatus, listType }) => {
  return (
    <ul className={classes["task-list"]}>
      {listSource.map((elem, index) => {
        return (
          <li key={index} onClick={() => toggleCompletedTaskStatus(listType, index)}>
            <div
              className={`${classes.task} ${
                listType === "completed" ? classes.completed : ""
              }`}>
              {elem}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
