import React from "react";
import PropTypes from "prop-types";

// Material COre
import { withStyles } from "@material-ui/core/styles";

// Material UI
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  label: {
    textTransform: "capitalize"
  },
  root: {
    margin: theme.spacing.unit
  }
});

const buttonJBH = props => {
  const { classes } = props;
  let { color, variant, type } = props;

  // Default Color
  color = color ? color : "primary";

  // Default Variant Type Button
  variant = variant ? variant : "contained";

  // Default Type Button
  type = type ? type : "button";
  
  return (
    <div>
      <Button
        color={color}
        variant={variant}
        className={classes.button}
        classes={{
          root: classes.root, // class name, e.g. `root-x`
          label: classes.label // class name, e.g. `disabled-x`
        }}
        onClick={props.clicked}
        type={type}
        fullWidth={props.fullWidth}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
    </div>
  );
};

buttonJBH.prototype = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "secondary"]),
  variant: PropTypes.oneOf(["contained", "text"]),
  linkTo: PropTypes.string,
  clicked: PropTypes.func.isRequired
};

export default withStyles(styles)(buttonJBH);
