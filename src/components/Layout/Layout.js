import React, { Fragment } from "react";
import classes from "./Layout.module.css";
import Toolbar from "./ToolBar/ToolBar";

const layout = props => {
  return (
    <Fragment>
      <Toolbar />
      <main className={classes.LayoutContent}>{props.children}</main>
    </Fragment>
  );
};

export default layout;
