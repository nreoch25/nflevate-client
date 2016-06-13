import React, { Component } from "react";

class DraftBoard extends Component {
  render() {
    return(
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
          </tr>
        </tbody>
      </table>
    );
  }
}

export default DraftBoard;
