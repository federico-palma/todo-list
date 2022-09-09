import { useState } from "react";
import classes from "./Header.module.css";
import pngPerson from "../Assets/pngPerson.png";
import AccountMenu from "./AccountMenu";

const Header = ({ user, userLoggedIn, logInWithGoogleHandler, signOutHandler }) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const showAccountMenuHandler = () => {
    setShowAccountMenu(prevValue => !prevValue);
  };

  const closeMenuOnBlurHandler = () => {
    setShowAccountMenu(false);
  };

  return (
    <div className={classes.header}>
      <h1>ToDo App</h1>
      <div className={classes["account-icon"]} onClick={showAccountMenuHandler}>
        <img src={userLoggedIn ? user.photoURL : pngPerson} alt="" />
      </div>
      {showAccountMenu && (
        <AccountMenu
          user={user}
          userLoggedIn={userLoggedIn}
          logInWithGoogleHandler={logInWithGoogleHandler}
          signOutHandler={signOutHandler}
          closeMenuOnBlurHandler={closeMenuOnBlurHandler}></AccountMenu>
      )}
    </div>
  );
};

export default Header;
