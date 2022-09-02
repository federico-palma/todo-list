import classes from "./TodoList.module.css";

const TaskList = ({ listSource, toggleCompletedTaskStatus, listType }) => {
  return (
    <ul className={classes[listType]}>
      {listSource.map((elem, index) => {
        return (
          <li key={index} onClick={e => toggleCompletedTaskStatus(listType, index)}>
            <p
              className={`${classes.task} ${
                listType === "completed-tasks" ? classes.completed : ""
              }`}>
              {elem}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
