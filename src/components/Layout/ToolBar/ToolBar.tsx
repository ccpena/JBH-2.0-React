import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import { styles } from "./ToolBarStyles";
// UI-Components
import LeftFlexItems from "./LeftFlexItems/LeftFlexItems";
import RightFlexItems from "./RightFlexItems/RightFlexItems";
import RightElementsMobile from "./RightFlexItems/RightFlexItemsMobile";

// JBH Components

/*
type operator WithStyles to help with dont maintain the classes name (styles and props)
 */
export interface Props extends WithStyles<typeof styles> {}

class PrimarySearchAppBar extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <LeftFlexItems />
            <div className={classes.grow} />
            <RightFlexItems title="Hello" />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

(PrimarySearchAppBar as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(PrimarySearchAppBar);
