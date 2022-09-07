import classes from "./Header.module.css";

const AccountMenu = ({ user, logInWithGoogleHandler, signOutHandler }) => {
  return (
    <div className={classes["account-menu"]}>
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
          <button onClick={signOutHandler} className={classes["logout-btn"]}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
