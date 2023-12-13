import React from "react";
import PropTypes from "prop-types";

// Material UI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  });

export interface FormProps extends WithStyles<typeof styles> {
  onSubmit: () => {};
  titleForm?: string;
  subTitleForm?: string;
}

const formJBH: React.FunctionComponent<FormProps> = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper className={classes.paper} elevation={4}>        
        <Typography variant="h6" gutterBottom color="primary">
          {props.titleForm}
        </Typography>
        <Typography variant="caption" color="textSecondary">{props.subTitleForm}</Typography>
     
        <form className={classes.form} onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </Paper>
    </React.Fragment>
  );
};

formJBH.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  titleForm: PropTypes.string,
  subTitleForm: PropTypes.string
};

export default withStyles(styles)(formJBH);
