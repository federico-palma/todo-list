import "./App.css";
import Header from "./Layout/Header";
// import Sidebar from "./Layout/Sidebar";
import Main from "./Layout/Main";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { auth, signInWithGoogle, dataBase } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";

class TodoListClass {
  constructor(title) {
    this.id = uuidv4();
    this.title = title;
    this.tasks = [];
    this.completedTasks = [];
  }
}

function App() {
  useEffect(() => {
    document.title = "ToDo Lists App";
  }, []);

  const [todoLists, setTodoLists] = useState([]);
  const [user, setUser] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [firebaseDataIsLoaded, setFirebaseDataIsLoaded] = useState(false);

  // handle User authentication
  const logInWithGoogleHandler = () => {
    signInWithGoogle();
  };

  const signOutHandler = async () => {
    await signOut(auth);
    setUserLoggedIn(false);
    setFirebaseDataIsLoaded(false);
    setTodoLists(() => {
      const localStorageLists =
        localStorage.getItem("todoLists") !== null
          ? JSON.parse(localStorage.getItem("todoLists"))
          : [];
      return localStorageLists;
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setUserLoggedIn(true);
      } else {
        setUser({});
        setUserLoggedIn(false);
      }
    });
  }, []);

  // Handle To do list storage
  // Save to local storage if User is not logged in
  useEffect(() => {
    if (!userLoggedIn && localStorage.getItem("todoLists") !== null) {
      let localStorageLists = JSON.parse(localStorage.getItem("todoLists"));
      setTodoLists(localStorageLists);
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (!userLoggedIn) {
      localStorage.setItem("todoLists", JSON.stringify(todoLists));
    }
  }, [todoLists, userLoggedIn]);

  // Handle Save to Firebase realtime database
  useEffect(() => {
    if (auth.currentUser) {
      const pathRef = ref(dataBase, "users/" + auth.currentUser.uid + "/todoLists");
      onValue(pathRef, snapshot => {
        const fetchedLists = [];
        const data = snapshot.val();
        if (data) {
          data.forEach(dbList => {
            fetchedLists.push({
              id: dbList.id,
              title: dbList.title,
              tasks: dbList.tasks ? [...dbList.tasks] : [],
              completedTasks: dbList.completedTasks ? [...dbList.completedTasks] : [],
            });
          });
          setTodoLists([...fetchedLists]);
          setFirebaseDataIsLoaded(true);
        } else {
          setTodoLists([]);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (auth.currentUser && firebaseDataIsLoaded) {
      const pathRef = ref(dataBase, "users/" + user.uid);
      set(pathRef, {
        name: user?.displayName,
        email: user?.email,
        todoLists: todoLists,
      });
    }
  }, [user, todoLists, firebaseDataIsLoaded, userLoggedIn]);

  // Handle Todo lists
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
        userLoggedIn={userLoggedIn}
        logInWithGoogleHandler={logInWithGoogleHandler}
        signOutHandler={signOutHandler}></Header>
      {/* <Sidebar></Sidebar> */}
      <Main
        todoLists={todoLists}
        addNewListHandler={addNewListHandler}
        updateListHandler={updateListHandler}
        deleteListHandler={deleteListHandler}></Main>
    </div>
  );
}

export default App;
