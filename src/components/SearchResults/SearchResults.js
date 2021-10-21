import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

export default class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.searchres}
          action={this.props.addtrack}
          isremoval={false}
        />
      </div>
    );
  }
}
