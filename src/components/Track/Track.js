import React, { Component } from "react";
import "./Track.css";

export default class Track extends Component {
  handleonclick = (track) => {
    console.log(track.name);
  };
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <button
          className="Track-action"
          onClick={() => this.props.action(this.props.track.id)}
        >
          {this.props.isremoval ? "-" : "+"}
        </button>
      </div>
    );
  }
}
