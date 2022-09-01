import "./App.css";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Main from "./Layout/Main";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoConstructor(title) {
  this.id = uuidv4();
  this.title = title;
  this.todoArray = [];
};

function App() {

  const [todoLists, setTodoLists] = useState([]);

  const addNewListHandler = title => {
    let newList = new TodoConstructor(title);

    setTodoLists(prevState => [...prevState, newList]);
  };

  return (
    <div className="App">
      <Header></Header>
      <Sidebar></Sidebar>
      <Main todoLists={todoLists} addNewListHandler={addNewListHandler}></Main>
    </div>
  );
}

export default App;
