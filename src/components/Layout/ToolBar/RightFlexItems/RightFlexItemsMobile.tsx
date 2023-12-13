import React, { Component } from "react";

// Material UI
import { withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import ExitIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

// Components
import { styles } from "../ToolBarStyles";

export interface Props extends WithStyles<typeof styles> {
  onLogout: () => {};
}

interface State {
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
}

export class rightElementsMobile extends Component<Props, State> {
  state: State = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };
  handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogOut = () => {
    this.handleMobileMenuClose();
    this.props.onLogout();
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.handleLogOut}>
        <IconButton color="inherit">
            <ExitIcon />
        </IconButton>
        <p>Log Out</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
        {renderMobileMenu}
      </div>
    );
  }
}

export default withStyles(styles)(rightElementsMobile);
