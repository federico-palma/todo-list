import classes from "./Header.module.css";

const Header = ({ user, logInWithGoogleHandler, signOutHandler }) => {
  return (
    <div className={classes.header}>
      <h1>ToDo App</h1>
      {!user && (
        <div className={classes["auth-div"]}>
          <button className={classes["login-with-google-btn"]} onClick={logInWithGoogleHandler}>
            Log In with Google
          </button>
        </div>
      )}
      {user && (
        <div className={classes["auth-div"]}>
          <h3>{user.displayName}</h3>
          <button onClick={signOutHandler}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
