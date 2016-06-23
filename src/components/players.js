import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayers } from "../actions/players";

class Players extends Component {

  componentWillMount() {
    this.props.fetchPlayers();
  }

  pickPlayer(evt) {
    if(evt.currentTarget.parentNode.parentNode.id === "players_draft") {
      console.log(evt.currentTarget);
    }
  }

  getPlayers() {
    if(!this.props.players) {
      return;
    } else {
      let players = [];
      this.props.players.map(player => {
        let pos = player.pos.toUpperCase();
        players.push(
          <tr key={player.rank} onClick={ (evt) => this.pickPlayer(evt) } className={pos}>
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
      <table id={rankingsID} className="table table-bordered table-hover">
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
    players: state.players.players
  }
}

export default connect(mapStateToProps, { fetchPlayers })(Players);
