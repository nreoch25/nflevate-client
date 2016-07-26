import React, { Component } from "react";

class DraftRow extends Component {
  getIndex(rd) {
    switch(rd) {
      case 1:
        return { start: 1, finish: 10 };
      case 2:
        return { start: 11, finish: 20 };
      case 3:
        return { start: 21, finish: 30 };
      case 4:
        return { start: 31, finish: 40 };
      case 5:
        return { start: 41, finish: 50 };
      case 6:
        return { start: 51, finish: 60 };
      case 7:
        return { start: 61, finish: 70 };
      case 8:
        return { start: 71, finish: 80 };
      case 9:
        return { start: 81, finish: 90 };
      case 10:
        return { start: 91, finish: 100 };
      case 11:
        return { start: 101, finish: 110 };
      case 12:
        return { start: 111, finish: 120 };
      case 13:
        return { start: 121, finish: 130 };
      case 14:
        return { start: 131, finish: 140 };
      case 15:
        return { start: 141, finish: 150 };
      case 16:
        return { start: 151, finish: 160 };
      case 17:
        return { start: 161, finish: 170 };
      default:
        break;
    }
  }
  getDraftRow(rd) {
    let pickIndex = this.getIndex(rd);
    let draftCells = [];
    let rdType = ( rd % 2 == 0 ) ? "even" : "odd";
    if(rdType === "odd") {
      for(var i = pickIndex.start; i <= pickIndex.finish; i++) {
        draftCells.push(<td id={`cell${i}`} key={i}></td>);
      }
    } else if(rdType = "even") {
      for(var i = pickIndex.finish; i >= pickIndex.start; i--) {
        draftCells.push(<td id={`cell${i}`} key={i}></td>);
      }
    }

    return draftCells;
  }
  render() {
    return (
      <tr key={this.props.round} id={`rd${this.props.round}`}>
        <th id={`head${this.props.round}`}>{this.props.round}</th>
          { this.getDraftRow(this.props.round) }
      </tr>
    );
  }
}

export default DraftRow;
