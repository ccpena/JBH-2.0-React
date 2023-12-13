import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import { AuthConsumer } from "../../../context/AuthContext";
import { navbar_nav } from "../../../constants/wrappedStyles";

const navigationItems = props => {
  return (
    <ul className={navbar_nav}>
      <AuthConsumer>
        {context =>
          context.isAuthenticated ? (
            <div>
              <NavigationItem link="/profile">Profile</NavigationItem>
              <button onClick={context.onLogout}>Log out</button>
            </div>
          ) : (
            <div>
              <NavigationItem link="/login" exact>
                Login
              </NavigationItem>
              <NavigationItem link="/signup">SingUp</NavigationItem>
            </div>
          )
        }
      </AuthConsumer>
    </ul>
  );
};

export default navigationItems;
