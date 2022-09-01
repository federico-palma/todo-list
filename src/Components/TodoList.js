import classes from "./TodoList.module.css";

const TodoList = ({ listObject }) => {
  return (
    <div className={classes["todo-list"]}>
      <h2>{listObject.title}</h2>
      <ul>
        {listObject.todoArray.map((elem, index) => {
          return <li key={index}>{elem}</li>;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
