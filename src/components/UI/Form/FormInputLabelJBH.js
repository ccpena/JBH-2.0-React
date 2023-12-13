import React from "react";

import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const formInputLabelJBH = props => {
  let inputType = "text";
  if (props.type !== undefined) {
    inputType = props.type;
  }

  return (
    <React.Fragment>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input
        id={props.id}
        error={props.error}
        name={props.id}
        value={props.value}
        type={inputType}
        required={props.required}
        autoComplete={props.autoComplete}
        onChange={event => handleInputChange(event, props.changed)}
        autoFocus={props.autoFocus}
        onBlur={event => handleOnBlur(event, props.blurred)}
      />
      <p>{props.errorMsg} </p>
    </React.Fragment>
  );
};

const handleInputChange = (event, validationFun) => {
  event.preventDefault();
  if (validationFun !== undefined) {
    const target = event.target;
    const inputValue = target.value;
    validationFun(inputValue);
  }
};

const handleOnBlur = (event, onBlurFun) => {
  event.preventDefault();

  if (onBlurFun !== undefined) {
    onBlurFun(event.target.value);
  }
};

formInputLabelJBH.propTypes = {
  id: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  errorMsg: PropTypes.string
};

export default formInputLabelJBH;
