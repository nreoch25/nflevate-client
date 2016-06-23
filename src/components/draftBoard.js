import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPickPosition } from "../actions/draft";

class DraftBoard extends Component {
  componentDidMount() {
    this.props.fetchPickPosition();
  }
  getPickPosition() {
    if(typeof this.props.draft.position.round !== "undefined") {
      return `Round ${this.props.draft.position.round} - Pick ${this.props.draft.position.pick}`;
    }
  }
  render() {
    let curPick = this.getPickPosition()
    return(
      <div>
        <div className="well well-sm"><strong>{curPick}</strong></div>
        <table id="draftboard" className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
          </thead>
          <tbody>
            <tr id="round1">
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { draft: state.draft }
}

export default connect(mapStateToProps, { fetchPickPosition })(DraftBoard);
