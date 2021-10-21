import React, { Component } from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks &&
          this.props.tracks.map((track, id) => {
            return (
              <Track
                key={track.id}
                action={this.props.action}
                track={track}
                isremoval={this.props.isremoval}
              />
            );
          })}
      </div>
    );
  }
}
