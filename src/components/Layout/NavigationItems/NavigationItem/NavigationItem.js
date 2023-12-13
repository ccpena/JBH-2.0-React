import React from "react";
import { NavLink } from "react-router-dom";
import { nav_item } from "../../../../constants/wrappedStyles";

const navigationItem = props => {
  return (
    <li className={nav_item}>
      <NavLink to={props.link} exact={props.exact}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
