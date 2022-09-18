import { useState } from "react";
import classes from "./Main.module.css";
import NewListForm from "../Components/NewListForm";
import TodoList from "../Todo List components/TodoList";
import ExpandedList from "../Todo List components/ExpandedList";

const Main = ({ todoLists, addNewListHandler, updateListHandler, deleteListHandler }) => {
  const [showExpandedList, setShowExpandedList] = useState(false);
  const [expandedListId, setExpandedListId] = useState(null);

  const showExpandedListHandler = todoList => {
    setExpandedListId(todoList.id);
    setShowExpandedList(true);
  };

  const closeExpandedListHandler = () => {
    setShowExpandedList(false);
    setExpandedListId(null);
  };

  const deleteExpListHandler = (listObject) => {
    if (deleteListHandler(listObject)) {
      setShowExpandedList(false);
      setExpandedListId(null);
    } 
  }

  return (
    <div className={classes.main}>
      <NewListForm addNewListHandler={addNewListHandler}></NewListForm>
      {todoLists.length > 0 && showExpandedList && (
        <ExpandedList
          listObject={todoLists.filter(elem => elem.id === expandedListId)[0]}
          updateListHandler={updateListHandler}
          deleteExpListHandler={deleteExpListHandler}
          closeExpandedListHandler={closeExpandedListHandler}></ExpandedList>
      )}
      <div className={classes["lists-container"]}>
        {todoLists.map(todoList => {
          return (
            <TodoList
              key={todoList.id}
              listObject={todoList}
              updateListHandler={updateListHandler}
              deleteListHandler={deleteListHandler}
              showExpandedListHandler={showExpandedListHandler}></TodoList>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
