import "./App.css";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Main from "./Layout/Main";
import { useState } from "react";

const todoConstructor = () => {

}

function App() {
  const [todoLists, setTodoLists] = useState();

  return (
    <div className="App">
      <Header></Header>
      <Sidebar></Sidebar>
      <Main todoLists={todoLists}></Main>
    </div>
  );
}

export default App;
