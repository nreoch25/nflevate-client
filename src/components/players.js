import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayers, removePlayer } from "../actions/players";
import { draftPick, updatePickPosition } from "../actions/draft";

class Players extends Component {

  componentDidMount() {
    // TODO create a Rankings component
    // seperate this from the Rankings page
    if(typeof this.props.players === "undefined") {
      this.props.fetchPlayers();
    }
  }
  confirmPick(player) {
    window.bootbox.confirm(`Are you sure you want to draft ${player.pos} - ${player.name} on ${player.team}`, function(result) {
      if(result === true) {
        this.props.draftPick(player);
        this.props.removePlayer(player);
        this.props.updatePickPosition();
      }
      if(this.props.draft.position.overall === 170) {

      }
    }.bind(this));
  }
  parsePick(pick) {
    let playerElements = pick.getElementsByTagName("td");
    let draftPickObject = {
      "rank": playerElements[0].innerText,
      "name": playerElements[1].innerText,
      "pos": playerElements[2].innerText,
      "team": playerElements[3].innerText,
      "bye": playerElements[4].innerText
    }
    this.confirmPick(draftPickObject);
  }
  pickPlayer(evt) {
    console.log(this.props.draft.position.overall);
    if(this.props.draft.position.overall === 170) {
      console.log("DRAFT OVER", this.props.draft.position.overall);
      return;
    }
    if(evt.currentTarget.parentNode.parentNode.id === "players_draft") {
      this.parsePick(evt.currentTarget);
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
    players: state.players.players,
    draft: state.draft
  }
}

export default connect(mapStateToProps, { fetchPlayers, draftPick, removePlayer, updatePickPosition })(Players);
