import { fade } from "@material-ui/core/styles/colorManipulator";
import { createStyles, Theme } from "@material-ui/core/styles";
import {
  purple,
  lightBlue,
  red,
  green,
  lime,
  grey,
  lightGreen
} from "@material-ui/core/colors";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: "auto"
      }
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    button: {
      margin: theme.spacing.unit
    },
    menuItem: {
      "&:focus": {
        backgroundColor: purple[400],
        "& $primary, & $icon": {
          // color: theme.palette.common.white
          color: grey[900]
        }
      }
    },
    primary: {},
    icon: {},
    menuItemUpdated: {
      color: red[400],
      "&$checked": {
        color: green[400]
      },
      background: lightBlue[600]
    },
    checked: {},
    fab: {
      margin: theme.spacing.unit
    },
    extendedIcon: {
      marginRight: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    }
  });
