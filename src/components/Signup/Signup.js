import React, { Component } from "react";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from "../../constants/index";
import FormControl from "../UI/Form/FormControlJBH";
import ButtonJBH from "../UI/Input/Button/ButtonJBH";
import Notification, {
  NotificationType
} from "../UI/Notification/Notification";
import { validateLength, validateEmail } from "../../util/StringUtils";

// materialUI
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// UI
import FormInputLabelJBH from "../UI/Form/FormInputLabelJBH";
import FormJBH from '../UI/Form/FormJBH';

// Services
import {
  checkNickNameAvailabilityService,
  checkEmailAvailabilityService,
  signUpService
} from "../../services/AuthService";
import { ALREADY_TAKEN, ERROR_UNKNOWN } from "../../constants/messages";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: { value: "", errorMsg: "", isValid: false, touched: false },
      nickName: { value: "", errorMsg: "", isValid: false, touched: false },
      email: { value: "", errorMsg: "", isValid: false, touched: false },
      password: { value: "", errorMsg: "", isValid: false, touched: false },
      isFormInvalid: true
    };
    this.state = { ...this.initialState };
    this.validationResults = null;
  }

  render() {
    const { name, nickName, email, password } = this.state;
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />        
        <FormJBH titleForm="Welcome to Just Be Honest!" subTitleForm="The tool that will change your life." className={classes.form} onSubmit={this.registerUser}>
          <FormControl required fullWidth>
            <FormInputLabelJBH
              id="nickName"
              value={nickName.value}
              label="Nickname"
              changed={this.validateNickName}
              blurred={this.checkNickNameAvailability}
              errorMsg={nickName.errorMsg}
              placeholder="Your favorite nick name"
              autoFocus
              required
              error={!nickName.isValid && nickName.touched}
            />
          </FormControl>
          <FormControl required fullWidth>
            <FormInputLabelJBH
              id="userName"
              value={name.value}
              errorMsg={name.errorMsg}
              changed={this.validateName}
              blurred={this.validateName}
              placeholder="Full Name"
              label="Full Name"
              error={!name.isValid && name.touched}
            />
          </FormControl>
          <FormControl required fullWidth>
            <FormInputLabelJBH
              id="email"
              value={email.value}
              errorMsg={email.errorMsg}
              changed={this.emailChangeHandler}
              blurred={this.checkEmailAvailability}
              placeholder="Your email"
              label="Your Email"
              error={!email.isValid && email.touched}
            />
          </FormControl>
          <FormControl required fullWidth>
            <FormInputLabelJBH
              id="password"
              type="password"
              label="Try to write an easy password to remember it"
              changed={this.validatePassword}
              blurred={this.validatePassword}
              value={password.value}
              errorMsg={password.errorMsg}
              error={!password.isValid && password.touched}
            />
          </FormControl>
          <ButtonJBH disabled={this.state.isFormInvalid} type="submit">
            Sign Up
          </ButtonJBH>
        </FormJBH>

        {this.validationResults}
      </main>
    );
  }

  registerUser = event => {
    event.preventDefault(); // Dont reload the page.
    this.validationResults = null;
    const signUpRequest = {
      name: this.state.name.value,
      username: this.state.nickName.value,
      email: this.state.email.value,
      password: this.state.password.value
    };
    signUpService(signUpRequest)
      .then(response => {
        const msgResponse = response.data.message;
        this.validationResults = (
          <Notification type={NotificationType.SUCCESS}>
            {msgResponse}
          </Notification>
        );
        this.setState({
          ...this.initialState
        });
        this.props.history.push("/login");
      })
      .catch(error => {
        console.error(error);
        this.validationResults = (
          <Notification type={NotificationType.SUCCESS}>
            ERROR_UNKNOWN
          </Notification>
        );
      });
  };

  isFormInvalid = () => {
    const isFormInvalid =
      !this.state.name.isValid ||
      !this.state.nickName.isValid ||
      !this.state.password.isValid ||
      !this.state.email.isValid;
    this.setState({
      isFormInvalid: isFormInvalid
    });
  };

  validateNickName = nickName => {
    const prevNickName = { ...this.state.nickName };
    const validationResult = validateLength(
      nickName,
      USERNAME_MIN_LENGTH,
      USERNAME_MAX_LENGTH
    );
    prevNickName.value = nickName;
    prevNickName.touched = true;
    prevNickName.isValid = validationResult == null;
    prevNickName.errorMsg = validationResult;
    this.setState({
      nickName: prevNickName
    });
    this.isFormInvalid();
  };

  checkNickNameAvailability = nickName => {
    if (nickName != null && this.state.nickName.isValid) {
      checkNickNameAvailabilityService(nickName)
        .then(response => {
          const result = !response.data.available ? ALREADY_TAKEN : null;
          const prevNickName = { ...this.state.nickName };

          prevNickName.errorMsg = result;
          prevNickName.isValid = result == null;

          this.setState({
            nickName: prevNickName
          });
        })
        .catch(error => {
          this.setState({
            nickName: {
              errorMsg: ERROR_UNKNOWN,
              isValid: false,
              touched: true
            }
          });
        });
    }
  };

  validateName = name => {
    const errorMsg = validateLength(name, NAME_MIN_LENGTH, NAME_MAX_LENGTH);
    this.setState({
      name: {
        errorMsg: errorMsg,
        value: name,
        isValid: errorMsg == null,
        touched: true
      }
    });

    this.isFormInvalid();
  };

  emailChangeHandler = email => {
    const validationResult = validateEmail(email);
    const prevEmail = { ...this.state.email };
    prevEmail.value = email;
    prevEmail.errorMsg = validationResult;
    prevEmail.isValid = validationResult == null;
    prevEmail.touched = true;

    this.setState({
      email: prevEmail
    });

    this.isFormInvalid();
  };

  checkEmailAvailability = email => {
    if (email != null && this.state.email.isValid) {
      checkEmailAvailabilityService(email)
        .then(response => {
          const result = !response.data.available ? ALREADY_TAKEN : null;
          const prevEmail = { ...this.state.email };
          prevEmail.value = email;
          prevEmail.errorMsg = result;
          prevEmail.isValid = result == null;
          prevEmail.touched = true;

          this.setState({
            email: prevEmail
          });
        })
        .catch(error => {
          const prevEmail = { ...this.state.email };
          prevEmail.errorMsg = ERROR_UNKNOWN;
          prevEmail.isValid = false;
          this.setState({
            email: prevEmail
          });
        });
    }
  };

  validatePassword = password => {
    const validationResult = validateLength(
      password,
      PASSWORD_MIN_LENGTH,
      PASSWORD_MAX_LENGTH
    );
    this.setState({
      password: {
        errorMsg: validationResult,
        value: password,
        isValid: validationResult == null,
        touched: true
      }
    });

    this.isFormInvalid();
  };
}

export default withStyles(styles)(SignUp);
