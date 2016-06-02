import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayers } from "../../actions/draft";

class Players extends Component {

  componentWillMount() {
    this.props.fetchPlayers();
  }

  getPlayers() {
    if(!this.props.players) {
      console.log("here");
      return;
    } else {
      let players = [];
      this.props.players.map(player => {
        players.push(
          <tr key={player.rank}>
            <td>{player.rank}</td>
            <td>{player.name}</td>
            <td>{player.pos}</td>
            <td>{player.team}</td>
            <td>{player.bye}</td>
          </tr>
        );
      });
      return players;
    }
  }

  render() {
    return(
      <div>
        <table className="table table-bordered">
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.draft.players
  }
}

export default connect(mapStateToProps, { fetchPlayers })(Players);
