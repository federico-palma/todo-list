import classes from "./Main.module.css";
import NewListForm from "../Components/NewListForm";
import TodoList from "../Todo List components/TodoList";

const Main = ({ todoLists, addNewListHandler, updateListHandler, deleteListHandler }) => {
  return (
    <div className={classes.main}>
      <NewListForm addNewListHandler={addNewListHandler}></NewListForm>
      <div className={classes["lists-container"]}>
        {todoLists.map(todoList => {
          return (
            <TodoList
              key={todoList.id}
              listObject={todoList}
              updateListHandler={updateListHandler}
              deleteListHandler={deleteListHandler}></TodoList>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
