import "./App.css";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Main from "./Layout/Main";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

class TodoListClass {
  constructor(title) {
    this.id = uuidv4();
    this.title = title;
    this.todoArray = ["do this", "and do this", "and also this"];
  }
}

function App() {
  const [todoLists, setTodoLists] = useState([]);

  const addNewListHandler = title => {
    let newList = new TodoListClass(title);

    setTodoLists(prevState => [...prevState, newList]);
  };

  const updateListHandler = newListObject => {
    let newList = [...todoLists];
    newList.forEach((elem, index) => {
      if (elem.id === newListObject.id) {
        newList[index] = newListObject;
      }
    });
    setTodoLists(newList);
  };

  return (
    <div className="App">
      <Header></Header>
      <Sidebar></Sidebar>
      <Main
        todoLists={todoLists}
        addNewListHandler={addNewListHandler}
        updateListHandler={updateListHandler}></Main>
    </div>
  );
}

export default App;
