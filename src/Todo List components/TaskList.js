import classes from "./TodoList.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";

const TaskList = ({
  listSource,
  toggleCompletedTaskStatus,
  deleteTaskHandler,
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
              className={classes["checkbox-container"]}
              onClick={e => {
                e.stopPropagation();
                toggleCompletedTaskStatus(listType, index);
              }}>
              {listType === "completed" ? (
                <CheckCircleIcon sx={{ fontSize: "20px" }} className={classes.checkboxes} />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{ fontSize: "20px" }}
                  className={classes.checkboxes}
                />
              )}
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
                onKeyDown={(e) => {if (e.key === "Enter") e.currentTarget.blur()}}
                className={`${classes["expanded-tasks"]} ${classes.task} ${
                  listType === "completed" ? classes.completed : ""
                }`}>
                {elem}
              </div>
            )}
            {expandedList && (
              <div
                className={classes["delete-task-container"]}
                onClick={e => {
                  e.stopPropagation();
                  deleteTaskHandler(listType, index);
                }}>
                <CloseIcon sx={{ fontSize: "20px" }} className={classes["delete-btn"]} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
