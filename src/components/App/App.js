import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistname: "Bangerz",
      playlisttracks: [],
      uris: [],
    };
  }

  addtrack(id) {
    let track = this.state.searchResults.find((x) => x.id === id);
    let tracks = this.state.playlisttracks;
    if (tracks.find((x) => x.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlisttracks: tracks });
  }

  removetrack(id) {
    let track = this.state.playlisttracks.find((x) => x.id === id);
    let tracks = this.state.playlisttracks;
    const index = tracks.indexOf(track);
    if (index > -1) {
      tracks.splice(index, 1);
    }
    this.setState({ playlisttracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistname: name });
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlisttracks.map((track) => {
      trackURIs.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistname, trackURIs).then(() => {
      this.setState({
        searchResults: [],
        playlistname: "Bangerz",
        playlisttracks: [],
        uris: [],
      });
    });
  }

  search(searchterm) {
    Spotify.search(searchterm).then((tracks) => {
      console.log(tracks);
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search.bind(this)} />
          <div className="App-playlist">
            <SearchResults
              searchres={this.state.searchResults}
              addtrack={this.addtrack.bind(this)}
            />
            <Playlist
              playlist={this.state.playlisttracks}
              name={this.state.playlistname}
              removetrack={this.removetrack.bind(this)}
              onNameChange={this.updatePlaylistName.bind(this)}
              onSave={this.savePlaylist.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
