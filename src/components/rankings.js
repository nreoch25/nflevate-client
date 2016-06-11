import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayersByPosition } from "../actions/players";
import Players from "./players";

class Rankings extends Component {
  constructor(props) {
    super(props);
    this.setRankingsNav = this.setRankingsNav.bind(this);
  }
  componentDidMount() {
    window.jQuery("#rankings_nav li").on("click", (evt) => {
      this.setRankingsNav(window.jQuery(evt.target).text());
      window.jQuery("#rankings_nav li").removeClass("active");
      window.jQuery(evt.target).addClass("active");
    });
  }
  setRankingsNav(pos) {
    this.props.fetchPlayersByPosition(pos);
  }
  render() {
    return (
      <div>
        <div id="rankings_nav" className="btn-group btn-group-justified">
          <li className="active btn btn-default">All</li>
          <li className="btn btn-default">QB</li>
          <li className="btn btn-default">RB</li>
          <li className="btn btn-default">WR</li>
          <li className="btn btn-default">TE</li>
          <li className="btn btn-default">DEF</li>
          <li href="#" className="btn btn-default">PK</li>
        </div>
        <Players />
      </div>
    );
  }
}

export default connect(null, { fetchPlayersByPosition })(Rankings);
