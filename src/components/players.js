import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayers } from "../actions/players";

class Players extends Component {

  componentWillMount() {
    this.props.fetchPlayers();
  }

  getPlayers() {
    if(!this.props.players) {
      return;
    } else {
      let players = [];
      this.props.players.map(player => {
        let pos = player.pos.toUpperCase();
        players.push(
          <tr key={player.rank} className={pos}>
            <td>{player.rank}</td>
            <td>{player.name}</td>
            <td>{pos}</td>
            <td>{player.team}</td>
            <td>{player.bye}</td>
          </tr>
        );
      });
      return players;
    }
  }

  render() {
    const rankingsID = `players_${this.props.type}`;
    return(
      <table id={rankingsID} className="table table-bordered">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
            <th>Bye</th>
          </tr>
        </thead>
        <tbody>
          { this.getPlayers() }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.draft.players
  }
}

export default connect(mapStateToProps, { fetchPlayers })(Players);
