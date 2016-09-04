import React, { Component } from "react";
import { connect } from "react-redux";
import { getCompletedDrafts } from "../actions/draft";

class Results extends Component {
  componentDidMount() {
    this.props.getCompletedDrafts();
  }
  getFinishedDrafts() {
    if(!this.props.draft.completedDrafts) {
      return;
    } else if(this.props.draft.completedDrafts.length === 0){
      return <div className="well"><p>No Drafts Saved</p></div>;
    }
    let drafts = [];
    let draftItems = [];
    console.log(this.props.draft.completedDrafts);
    this.props.draft.completedDrafts.map((draft) => {
      draft.items[0].draft.map((item, index) => {
        console.log(item);
        draftItems.push(
          <div className="well">
            <p>Pick: {index + 1}</p>
            <p>Player: {item.name}</p>
            <p>Pos: {item.pos}</p>
            <p>Team: {item.team}</p>
            <p>Bye: {item.bye}</p>
          </div>
        );
      });
      drafts.push(draftItems);
    });
    return drafts;
  }
  render() {
    return (
      <div>
        { this.getFinishedDrafts() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { draft: state.draft }
}

export default connect(mapStateToProps, { getCompletedDrafts })(Results);
