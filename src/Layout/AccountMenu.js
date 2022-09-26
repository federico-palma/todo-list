import { useEffect } from "react";
import { useRef } from "react";
import classes from "./Header.module.css";
import pngPerson from "../Assets/pngPerson.png";

const AccountMenu = ({
  user,
  userLoggedIn,
  logInWithGoogleHandler,
  signOutHandler,
  closeMenuOnBlurHandler,
}) => {
  // Handle click outside menu to close it
  const accountMenuRef = useRef();
  useEffect(() => {
    const handleClickOutside = event => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        closeMenuOnBlurHandler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountMenuRef, closeMenuOnBlurHandler]);

  return (
    <div ref={accountMenuRef} className={classes["account-menu"]}>
      {!userLoggedIn && (
        <div className={classes["auth-div"]}>
          <button className={classes["login-with-google-btn"]} onClick={logInWithGoogleHandler}>
            Log In with Google
          </button>
        </div>
      )}
      {userLoggedIn && (
        <div className={classes["auth-div"]}>
          <div className={classes["account-icon"]}>
            <img
              src={userLoggedIn ? user.photoURL : pngPerson}
              alt=""
              onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = pngPerson;
              }}
            />
          </div>
          <h3>{user.displayName}</h3>
          <h3>{user.email}</h3>
          <button onClick={signOutHandler} className={classes["logout-btn"]}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
