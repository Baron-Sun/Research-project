import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import IframePage from "./pages/IframePage/IframePage";

import Nav from "./components/Nav";
import Login from "./pages/Login/Login";
import Welcome from "./pages/Welcome/Welcome";
import Page404 from "./pages/404/404";

import { Fragment } from "react";

import Footer from "./components/Foot";
// import './App.css'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: sessionStorage.getItem('user_name'),
    };
  }

  componentDidMount() {
    //this.context.router.transitionTo('/');
    this.setState({ redirect: "/" });
  }

  render() {
    const { loading, authUser } = this.props;
    const { auth } = this.state;

    const isLogin = (authUser || auth)

    return (
      <Router>
        <Fragment>
          {isLogin && <Nav />}
          <div className="container flex-wrap flex-center flex-middle flex-direction-column">
            {!isLogin
              ?
              <Route render={() => (
                <Fragment>
                  <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/login" exact component={Login} />
                    <Route path='*' component={Page404} />
                  </Switch>
                </Fragment>
              )} />
              :
              <Fragment>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/home" exact component={Home} />
                  <Route path="/iframe/:bookId" component={IframePage} />
                </Switch>
                {/* <Footer /> */}
              </Fragment>
            }
          </div>
        </Fragment>

      </Router>
    );
  }
}

export default connect(({ authUser, LoadingBar }) => ({ authUser, loading: LoadingBar }))(App);
