import * as React from "react";

// Constants
import { SectionType } from "../../../../constants/SectionType";

// Material UI
import { withStyles, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// Material UI Icons

import AccountCircle from "@material-ui/icons/AccountCircle";

// Components
import { styles } from "../ToolBarStyles";
import RigthElementsLogged from "./RigthElementsLogged";
import RigthElementsUnLogged from "./RigthElementsUnLogged";
import RightFlextItemsMobile from "./RightFlexItemsMobile";

import { AuthConsumer } from "../../../../context/AuthContext";

interface State {
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
}

/*
type operator WithStyles to help with dont maintain the classes name (styles and props)
 */
export interface Props extends WithStyles<typeof styles> {
  // custom props
  title: string;
}

class rightFlexItems extends React.Component<Props, State> {
  ctxGlobal: any;

  state: State = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <AuthConsumer>
        {context =>
          context.isAuthenticated ? (
            <React.Fragment>
              <div className={classes.sectionDesktop}>
                <RigthElementsLogged
                  onLogout={context.onLogout}
                  device={SectionType.DESKTOP}
                />
              </div>
              <div className={classes.sectionMobile}>
                <RightFlextItemsMobile onLogout={context.onLogout} />
              </div>
            </React.Fragment>
          ) : (
            <div>
              <RigthElementsUnLogged />
            </div>
          )
        }
      </AuthConsumer>
    );
  }

  handleLogOut = (ctxParam: any) => {
    if (this.ctxGlobal) {
      this.ctxGlobal.onLogout();
    }
  };

  handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };
}

export default withStyles(styles)(rightFlexItems);
