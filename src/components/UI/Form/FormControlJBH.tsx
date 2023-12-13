import React from "react";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const formControlUI: React.FunctionComponent<{
  required: boolean;
  fullWidth: boolean;
}> = props => {
  return (
    <FormControl margin="normal" {...props}>
      {props.children}
    </FormControl>
  );
};

formControlUI.propTypes = {
  required: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired
};

export default formControlUI;
