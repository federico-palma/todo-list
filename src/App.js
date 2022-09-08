import "./App.css";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Main from "./Layout/Main";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { auth, signInWithGoogle } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

class TodoListClass {
  constructor(title) {
    this.id = uuidv4();
    this.title = title;
    this.tasks = [];
    this.completedTasks = [];
  }
}

function App() {
  // handle User authentication
  const [user, setUser] = useState({});

  const logInWithGoogleHandler = () => {
    signInWithGoogle();
  };

  const signOutHandler = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      console.log(currentUser);
      if (currentUser === null) {
        setUser(null);
      } else {
        setUser(currentUser);
      }
    });
  }, []);

  // Load and save to local storage the to do lists
  const [todoLists, setTodoLists] = useState(() => {
    if (localStorage.getItem("todoLists") !== null) {
      let localStorageLists = JSON.parse(localStorage.getItem("todoLists"));
      return localStorageLists;
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }, [todoLists]);

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

  const deleteListHandler = listObject => {
    if (window.confirm(`Are you sure you want to delete the list: ${listObject.title}?`)) {
      let newList = todoLists.filter(elem => elem.id !== listObject.id);
      setTodoLists(newList);
    }
  };

  return (
    <div className="App">
      <Header
        user={user}
        logInWithGoogleHandler={logInWithGoogleHandler}
        signOutHandler={signOutHandler}></Header>
      <Sidebar></Sidebar>
      <Main
        todoLists={todoLists}
        addNewListHandler={addNewListHandler}
        updateListHandler={updateListHandler}
        deleteListHandler={deleteListHandler}></Main>
    </div>
  );
}

export default App;
