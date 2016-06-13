import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Header extends Component {
  componentDidMount() {
    const currentNav = window.location.pathname.replace("/", "");
    const activeNav = ( currentNav === "" ) ? "home" : currentNav;
    window.jQuery(`#nav-${activeNav}`).addClass("active");
  }
  renderLinks() {
    if(this.props.authenticated) {
      // show a link to sign out
      return (
        <li>
          <Link to="/signout"><span className="glyphicon glyphicon-log-in"></span> Sign Out</Link>
        </li>
      );
    } else {
      // show a link to sign in or sign up
      return [
        <li key={1}>
          <Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Sign In</Link>
        </li>,
        <li key={2}>
          <Link to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link>
        </li>
      ]

    }

  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">NFLevate</Link>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul id="app_nav" className="nav navbar-nav">
              <li id="nav-home"><Link to="/">Home</Link></li>
              <li id="nav-draft"><Link to="/draft">Draft</Link></li>
              <li id="nav-rankings"><Link to="/rankings">Rankings</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
