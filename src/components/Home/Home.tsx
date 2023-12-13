import * as React from "react";
import { getAllAccounts } from "../../services/AccountService";
import { AuthConsumer } from "../../context/AuthContext";
import burgerLogo from "../../../assets/images/burger-logo.png";

// Views
import AccountCard from "../../views/accounts/AccountCard";
import { Theme, withStyles, WithStyles } from "@material-ui/core";

const styles = (theme: Theme) => ({
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
  }
});

interface HomeProps extends WithStyles<typeof styles> {}

class Home extends React.Component<HomeProps, {}> {
  totalAccounts = 0;

  componentDidMount() {
    getAllAccounts()
      .then(response => {
        this.totalAccounts = response.data;
        console.log("TotalAccounts", this.totalAccounts);
      })
      .catch(error => {
        console.error("Error on Home", error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <AuthConsumer>
          {({ isAuthenticated, currentUser }) =>
            isAuthenticated ? (
              <div>
                <AccountCard totalAccounts={this.totalAccounts} />
              </div>
            ) : null
          }
        </AuthConsumer>
      </main>
    );
  }
}

export default withStyles(styles)(Home);
