import React, { Fragment, FunctionComponent } from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles
} from "@material-ui/core/styles";
// Material Design
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = (theme: Theme) =>
  createStyles({
    gridRoot: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  });

interface GridExampleProps extends WithStyles<typeof styles> {}

const gridExample: FunctionComponent<GridExampleProps> = props => {
  const { classes } = props;

  return (
    <div className={classes.gridRoot}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>xs=12 - md=6</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(gridExample);
