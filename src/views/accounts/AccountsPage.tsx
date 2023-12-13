import React, { Component } from "react";

// Services
import { getAllAccounts } from "../../services/AccountService";
import classnames from "classnames";

// Router
import { RouteComponentProps, withRouter } from "react-router-dom";

// Payload
import AccountDTO from "../../payloads/dto/AccountsDTO";
import TransactionDTO from "../../payloads/dto/TransactionDTO";

// UI
import CardJBH from "../../components/UI/Card/CardJBH";
import TableJBH, {ColJBH} from "../../components/UI/Table/TableJBH";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Grid
} from "@material-ui/core";
import { mainRoot } from "../../constants/wrappedStyles";

// Material UI
import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green, lightBlue, grey, blueGrey } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
const defaultMaxWidth = 500;
const defaultCardHeight = "auto";

// Declaring Props
const styles = (theme: Theme) =>
  createStyles({
    ...mainRoot(theme, 800),
    card: {
      maxWidth: defaultMaxWidth,
      height: defaultCardHeight
    },
    avatar: {
      backgroundColor: lightBlue[100]
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: "cover",
      justifyItems: "center",
      alignContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    },
    actions: {
      display: "flex"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    badge: {
      margin: theme.spacing.unit * 2,
      top: "-95%",
      right: -20,
      // The border color match the background color.
      border: `2px solid ${
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[900]
      }`
    },
    gridRoot: {
      flexGrow: 1
    },
    margin: {
      margin: theme.spacing.unit * 2
    },
    padding: {
      padding: `0 ${theme.spacing.unit * 2}px`
    }
  });

export interface AccountPageCustomProps extends WithStyles<typeof styles> {}

type AccountPageProps = RouteComponentProps<{}> & AccountPageCustomProps;

interface AccountsState {
  accounts: Array<AccountDTO>;
  expanded: boolean;
}

class AccountsPage extends Component<AccountPageProps, AccountsState> {
  state: AccountsState = {
    accounts: [],
    expanded: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleAccountClick = (accountId: string) => {
    this.props.history.push("/account/".concat(accountId));    
  };

  render() {
    const { classes } = this.props;
    let transactions: Array<TransactionDTO> = [];
    const colTx: Array<ColJBH> = [
      { name: "description" },
      { name: "effectiveDate" },
      { name: "totalValue" }
    ];

    console.log("MainRoot", mainRoot);
    console.log("Accounts:", this.state, this.props);
    const customHeader = (
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <Typography variant="body2">Default Account for kkpa</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            style={{ color: "#4CAF50", fontWeight: "bold" }}
          >
            8.500.500
          </Typography>
        </Grid>
      </Grid>
    );
    const accountsCard = this.state.accounts.map(account => {
      return (
        <React.Fragment key={account.id}>
          <main className={classes.main} key={account.id}>
            <Card
              key={account.id}
              raised={true}
              elevation={1}
              className={classes.card}
            >
              <CardActionArea
                onClick={event => this.handleAccountClick(account.id)}
              >
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      💸
                    </Avatar>
                  }
                  title={customHeader}
                  subheader={"Saving Account"}
                />
                <CardContent />
                <CardContent>
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <Badge
                        color="primary"
                        classes={{ badge: classes.badge }}
                        badgeContent={"7.500.548"}
                      >
                        <Typography variant="h5" align="left" color="primary">
                          Incomes
                        </Typography>
                      </Badge>
                    </Grid>
                    <Grid item xs={6}>
                      <Badge
                        color="secondary"
                        classes={{ badge: classes.badge }}
                        badgeContent={"6.100.548"}
                      >
                        <Typography variant="h5" color="secondary">
                          Expenses
                        </Typography>
                      </Badge>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <TableJBH<TransactionDTO> data={transactions} cols={colTx} widthTable="80%" />
                </CardContent>
              </Collapse>
            </Card>
          </main>
        </React.Fragment>
      );
    });
    return <React.Fragment>{accountsCard}</React.Fragment>;
  }

  componentWillMount() {
    getAllAccounts()
      .then(response => {
        this.setState({
          accounts: response.data
        });
      })
      .catch();
  }
}

export default withRouter(withStyles(styles)(AccountsPage));
