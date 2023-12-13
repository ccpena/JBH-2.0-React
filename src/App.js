import React, { Component, Fragment } from "react";
import "./App.css";
// Containers
import Layout from "./components/Layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
// Components
import User from "./components/Users/User";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { ACCESS_TOKEN } from "./constants/index";
// UI
import Notification from "./components/UI/Notification/Notification";
import { Route, Switch, withRouter } from "react-router-dom";
// Services
import { getCurrentUser } from "./services/UserService";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/Layout/ProtectedRoute/ProtectedRoute";
// View Pages
import AccountsPage from "./views/accounts/AccountsPage";
import NewTransaction from "./views/transactions/NewTransaction";
import AccountDetails from "./views/accounts/AccountDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };

    this.loggedIn = false;
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.loggedIn = true;
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  };

  componentDidMount() {
    console.log("[App][componentDidMount]", this.state);
  }

  componentDidUpdate() {
    console.log("[App][componentDidUpdate]", this.state);
  }

  componentWillUpdate() {
    console.log("[App][componentDidUpdate]", this.state);
  }

  componentWillMount() {
    console.log("[App][componentWillMount]", this.state);
    if (this.state.isAuthenticated || localStorage.getItem(ACCESS_TOKEN)) {
      this.loadCurrentUser();
    }
    console.log("[App][componentWillMount-End]", this.state);
  }

  componentWillReceiveProps() {
    console.log("[App][componentWillReceiveProps]", this.state);
  }

  loginHandler = () => {
    this.props.history.push("/");
    this.loadCurrentUser();
  };

  handleLogout = (
    redirectTo = "/",
    notificationType = "success",
    description = "You're successfully logged out."
  ) => {
    console.log("Log Out!");
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
  };

  render() {
    console.log("[App]Render", this.state);
    const welcomeNotification = this.loggedIn ? (
      <Notification
        large
        type="success"
        msg={"Hello! " + this.state.currentUser.name + " 🙂"}
      />
    ) : null;
    if (this.loggedIn) this.loggedIn = false;
    return (
      <AuthContext.Provider
        value={{
          currentUser: this.state.currentUser,
          isAuthenticated: this.state.isAuthenticated,
          onLogout: this.handleLogout
        }}
      >
        <Layout>
          <ErrorBoundary>
            <div>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home isAuthenticated={this.state.isAuthenticated} />
                  )}
                />
                <Route path="/user" component={User} />
                <Route
                  path="/login"
                  render={props => <Login onLogin={this.loginHandler} />}
                />
                <Route path="/signup" component={SignUp} />
                {this.state.isAuthenticated ? (
                  <Fragment>
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute
                      isAuthenticated={this.state.isAuthenticated}
                      path="/accounts"
                      component={AccountsPage}
                    />
                    <ProtectedRoute
                      isAuthenticated={this.state.isAuthenticated}
                      path="/account/:id"
                      exact                      
                      component={AccountDetails}
                    />
                    <ProtectedRoute
                      isAuthenticated={this.state.isAuthenticated}
                      path="/account/:id/transaction"
                      exact
                      component={NewTransaction}
                    />
                  </Fragment>
                ) : null}
              </Switch>
            </div>
          </ErrorBoundary>
        </Layout>
        {welcomeNotification}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
