import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";

export const NotificationType = {
  WARN: "warning",
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  DEFAULT: "default"
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const notificationStateStyles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(notificationStateStyles)(
  MySnackbarContent
);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      msg: props.msg
    };
  }

  handleClose = (event, reason) => {
    console.log("close");
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false, msg: null });
  };

  componentWillReceiveProps() {
    this.setState({
      open: this.props.msg != null
    });
  }

  defaultNotification = msg => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{msg}</span>}
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={this.handleClose}
          >            
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className="padding: theme.spacing.unit / 2"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  };

  render() {
    const { msg, type } = this.props;

    if (!this.state.open) {
      return null;
    }

    const defaultSnackBar = type
      ? this.notificationSwitchHandler()
      : this.defaultNotification(msg);
    return <Fragment>{defaultSnackBar}</Fragment>;
  }

  notificationSwitchHandler = () => {
    const { type, large, classes, msg } = this.props;

    const notification = large ? (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant={type}
          message={msg}
        />
      </Snackbar>
    ) : (
      <MySnackbarContentWrapper
        variant={type}
        className={classes.margin}
        onClose={this.handleClose}
        message={msg}
      />
    );

    return <div>{notification}</div>;
  };
}

Notification.propTypes = {
  type: PropTypes.oneOf(Object.values(NotificationType)),
  msg: PropTypes.string.isRequired,
  large: PropTypes.bool
};

Notification.type = NotificationType;

export default withStyles(styles2)(Notification);
