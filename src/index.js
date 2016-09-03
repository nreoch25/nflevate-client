import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import reduxThunk from "redux-thunk";

import App from './components/app';
import Index from "./components/index";
import Signin from "./components/auth/signin";
import Signout from "./components/auth/signout";
import Signup from "./components/auth/signup";
import Draft from "./components/draft";
import Rankings from "./components/rankings";
import Results from "./components/results";
import RequireAuth from "./components/auth/require_auth";
import reducers from './reducers';
import { AUTH_USER } from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("nflevate_token");

// If we have a token, consider the user to be signed in
if(token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

browserHistory.listen((evt) => {
  const currentNav = evt.pathname.replace("/", "");
  const activeNav = ( currentNav === "" ) ? "home" : currentNav;
  window.jQuery("#app_nav li").removeClass("active");
  window.jQuery(`#nav-${activeNav}`).addClass("active");
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="draft" component={RequireAuth(Draft)} />
        <Route path="rankings" component={RequireAuth(Rankings)} />
        <Route path="results" component={RequireAuth(Results)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
