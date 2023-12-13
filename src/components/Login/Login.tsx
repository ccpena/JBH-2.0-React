import React, { Component, FormEvent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Services
import { loginService } from "../../services/AuthService";
// Constants
import { ACCESS_TOKEN } from "../../constants/index";
import { withRouter, RouteComponentProps } from "react-router-dom";

// UI
//import Button from "../UI/Input/Button";
import FormControlJBH from "../UI/Form/FormControlJBH";
import FormInputLabelJBH from "../UI/Form/FormInputLabelJBH";
import Notification, {
  NotificationType
} from "../UI/Notification/Notification";

// MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./LoginStyles";
import { AuthConsumer } from "../../context/AuthContext";

export interface Props extends WithStyles<typeof styles> {
  onLogin: () => {};
}
type LoginProps = RouteComponentProps<{}> & Props;

interface State {
  nickName: string;
  password: string;
  errorMsg: null;
  contErrors: number;
}

class Login extends Component<LoginProps, State> {
  state: State = {
    nickName: "",
    password: "",
    errorMsg: null,
    contErrors: 0
  };

  loginHandler = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    const loginRequest = {
      usernameOrEmail: this.state.nickName,
      password: this.state.password
    };
    loginService(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        this.props.history.push("/");
        this.props.onLogin();
      })
      .catch(error => {
        this.setState({
          errorMsg: error,
          contErrors: this.state.contErrors + 1
        });
      });
  };

  passwordHandler = (password: string) => {
    this.setState({
      password: password
    });
  };

  nickNameHandler = (nickName: string) => {
    this.setState({
      nickName: nickName
    });
  };

  render() {
    const { classes } = this.props;
    const { errorMsg } = this.state;
    const notification =
      errorMsg != null ? (
        <Notification
          large
          type={NotificationType.ERROR}
          msg={"Bad Credentials"}
        />
      ) : null;

    return (
      <main className={classes.main}>
        <AuthConsumer>
          {({ isAuthenticated }) =>
            isAuthenticated ? (
              <div />
            ) : (
              <React.Fragment>
                <CssBaseline />
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <form className={classes.form} onSubmit={this.loginHandler}>
                    {notification}
                    <FormControlJBH required fullWidth>
                      <FormInputLabelJBH
                        label="NickName or Email"
                        placeholder="Nickname or Email"
                        id="email"
                        autoComplete="email"
                        error={this.state.errorMsg != null}
                        changed={this.nickNameHandler}
                        autoFocus
                        required
                      />
                    </FormControlJBH>
                    <FormControlJBH required fullWidth>
                      <FormInputLabelJBH
                        label="Your password"
                        id="password"
                        type="password"
                        error={this.state.errorMsg != null}
                        autoComplete="current-password"
                        changed={this.passwordHandler}
                        required
                      />
                    </FormControlJBH>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign in
                    </Button>
                    <Link to="/signup">Or register now!</Link>
                  </form>
                </Paper>
              </React.Fragment>
            )
          }
        </AuthConsumer>
      </main>
    );
  }
}

(Login as React.ComponentClass<LoginProps>).propTypes = {
  onLogin: PropTypes.func.isRequired
} as any;

export default withStyles(styles)(withRouter(Login));
