// Grid - Layouts
export const container_style = "container";
// Forms
export const form_control = "form-control";
export const form_group = "form-group";
// Buttons
export const btn_success = "btn btn-success";
// Alerts
export const alert_warning = "alert alert-warning";
export const alert_success = "alert alert-success";
export const alert_error = "alert alert-danger";
// Notification
export const notification_warning = "alert alert-warning";
export const notification_success = "alert alert-success";
export const notification_error = "alert alert-danger";
// NavBar
export const navbar_nav = "navbar-nav";
export const nav_item = "nav-item";

export const mainRoot = (theme, width = 500) => {
  const mainRoot = {
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: width,
        marginLeft: "auto",
        marginRight: "auto"
      }
    }
  };

  return mainRoot;
};
