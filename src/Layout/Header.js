import { useState } from "react";
import classes from "./Header.module.css";
import pngPerson from "../Assets/pngPerson.png";
import AccountMenu from "./AccountMenu";

const Header = ({ user, logInWithGoogleHandler, signOutHandler }) => {
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
        <img src={user ? user.photoURL : pngPerson} alt="" />
      </div>
      {showAccountMenu && (
        <AccountMenu
          user={user}
          logInWithGoogleHandler={logInWithGoogleHandler}
          signOutHandler={signOutHandler}
          closeMenuOnBlurHandler={closeMenuOnBlurHandler}></AccountMenu>
      )}
    </div>
  );
};

export default Header;
