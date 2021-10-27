import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

export default class Playlist extends Component {
  handlenamechange = (event) => {
    this.props.onNameChange(event.target.value);
  };
  render() {
    return (
      <div className="Playlist">
        <input
          defaultValue={this.props.name}
          onChange={this.handlenamechange}
        />
        <TrackList
          tracks={this.props.playlist}
          action={this.props.removetrack}
          isremoval={true}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
