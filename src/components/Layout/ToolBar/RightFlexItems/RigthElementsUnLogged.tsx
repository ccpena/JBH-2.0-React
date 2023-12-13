import React, { Component, ReactElement, Fragment } from "react";

// Constants
import { SectionType } from "../../../../constants/SectionType";

// Styles
import { styles } from "../ToolBarStyles";

// Material UI
import { withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Material UI Icons
import AddIcon from "@material-ui/icons/Add";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";

import { Link as RouterLink } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";
import classes from "*.module.scss";
import { Fade } from "@material-ui/core";

interface State {
  elements: Array<any>;
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
}

type UnLoggedProps = RouteComponentProps<{}> & WithStyles<typeof styles>;

class RigthElementsUnLogged extends Component<UnLoggedProps, {}> {
  state: State = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    elements: [
      { id: 1, type: "Login", title: "Login", link: "/login" },
      { id: 2, type: "SignUp", title: "SignUp", link: "/signup" }
    ]
  };

  jbhClasses: any;
  classes: any;

  render() {
    this.classes = this.props;
    this.jbhClasses = this.classes;
    const { classes } = this.jbhClasses;

    return (
      <React.Fragment>
        <div className={classes.sectionDesktop}>
          <React.Fragment>
            <Grid container spacing={8}>
              {this.desktopMobileElementsMap(SectionType.DESKTOP)}
            </Grid>
          </React.Fragment>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          {this.desktopMobileElementsMap(SectionType.MOBILE)}
        </div>
      </React.Fragment>
    );
  }

  handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = (
    event: React.MouseEvent<HTMLElement>,
    link: string
  ) => {
    this.handleMenuClose();
    this.props.history.push(link);
  };

  handleMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  desktopMobileElementsMap(sectionType: SectionType): any {
    switch (sectionType) {
      case SectionType.DESKTOP:
        const desktopElements = this.state.elements.map(el => {
          return (
            <Grid item key={el.id}>
              <RouterLink to={el.link}>
                <Button variant="contained" color="primary">
                  {el.title}
                </Button>
              </RouterLink>
            </Grid>
          );
        });
        return desktopElements;

      case SectionType.MOBILE:
        const { mobileMoreAnchorEl } = this.state;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const renderMobileMenu = (
          <Menu
            id="unlogged-menu"
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={this.handleMenuClose}
            TransitionComponent={Fade}
          >
            {this.state.elements.map(el => {
              return (
                <MenuItem
                  key={el.id}
                  color="inherit"
                  className={this.jbhClasses.menuItemUpdated}
                  selected={el.id == 2}
                  onClick={event => this.handleMobileMenuClose(event, el.link)}
                >
                  {el.title}
                </MenuItem>
              );
            })}
          </Menu>
        );
        return renderMobileMenu;
      default:
        <div>Device not recognized</div>;
        break;
    }
  }
}

export default withStyles(styles)(withRouter(RigthElementsUnLogged));
