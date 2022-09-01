import { v4 as uuidv4 } from 'uuid';
import classes from "./Main.module.css";
import NewListForm from "../Components/NewListForm";

const Main = ({todoLists, addNewListHandler}) => {
  return (
    <div className={classes.main}>
      <NewListForm addNewListHandler={addNewListHandler}></NewListForm>
      <div className={classes["lists-container"]}>
        {todoLists.map((todoList) => {
          return <h2 key={todoList.id}>{todoList.title}</h2>
        })}
      </div>
    </div>
  );
};

export default Main;
