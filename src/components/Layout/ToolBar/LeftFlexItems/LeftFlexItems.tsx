import * as React from "react";
import { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../ToolBarStyles";

// MaterialUI
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography";

// Material UI - Icons
import MenuIcon from "@material-ui/icons/Menu";

const leftFlexItems: React.FunctionComponent<{}> = props => {
  return (
    <Fragment>
      <IconButton color="inherit" aria-label="Open drawer">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" noWrap>
        JBH
      </Typography>
    </Fragment>
  );
};

export default withStyles(styles)(leftFlexItems);
