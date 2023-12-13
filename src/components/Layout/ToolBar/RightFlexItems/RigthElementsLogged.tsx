import React, { Component, ReactElement } from "react";

// Styles
import { styles } from "../ToolBarStyles";

// Material UI
import { withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

// Material UI Icons
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { SectionType } from "../../../../constants/SectionType";

export interface Props extends WithStyles<typeof styles> {
  device?: SectionType;
  onLogout: () => {};
}

interface State {
  elements: Array<any>;
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
}

class RigthElementsLogged extends Component<Props, State> {
  state: State = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    elements: [
      { id: 1, type: "Login", title: "Login", link: "/login" },
      { id: 2, type: "SignUp", title: "SignUp", link: "/signup" }
    ]
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>    
  ) => {            
        this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const { classes } = this.props;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.props.onLogout}>Log out</MenuItem>
      </Menu>
    );
    return (
      <React.Fragment>
        {this.props.device ? (
          <div>
            <h1>Device</h1>
          </div>
        ) : null}
        <IconButton color="inherit">
          <Badge badgeContent={8} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={event => this.handleProfileMenuOpen(event)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {renderMenu}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RigthElementsLogged);
