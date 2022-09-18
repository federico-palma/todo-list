import classes from "./TodoList.module.css";

const TaskList = ({
  listSource,
  toggleCompletedTaskStatus,
  listType,
  expandedList,
  editTaskHandler,
}) => {
  return (
    <ul className={classes["task-list"]}>
      {listSource.map((elem, index) => {
        return (
          <li key={index}>
            <div
              className={classes.checkbox}
              onClick={() => toggleCompletedTaskStatus(listType, index)}>
              {listType === "completed" ? "X" : "O"}
            </div>
            {!expandedList && (
              <div
                className={`${classes.task} ${listType === "completed" ? classes.completed : ""}`}>
                {elem}
              </div>
            )}
            {expandedList && (
              <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={event => editTaskHandler(event, listType, index)}
                className={`${classes.task} ${listType === "completed" ? classes.completed : ""}`}>
                {elem}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
