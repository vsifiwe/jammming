import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Deezer from "../../util/Deezer";
import "./App.css";

const host = "https://jammming-deezer.herokuapp.com";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      access_token: "",
      userid: "",
      searchResults: [],
      playlistname: "New Playlist",
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
    let ids = "";
    this.state.playlisttracks.map((track) => {
      return (ids = ids + track.id + ",");
    });

    Deezer.savePlaylist(
      this.state.playlistname,
      ids,
      this.state.access_token,
      this.state.userid
    ).then(() => {
      this.setState({
        userid: "",
        searchResults: [],
        playlistname: "Bangerz",
        playlisttracks: [],
        uris: [],
      });
    });
  }

  search(searchterm) {
    Deezer.search(searchterm).then((tracks) => {
      this.setState({ searchResults: tracks });
    });
  }

  componentDidMount() {
    const tokenmatch = window.location.href.match(/token=([^&]*)/);

    if (tokenmatch) {
      fetch(`${host}/user?token=${tokenmatch[1]}`)
        .then((response) => response.json())
        .then((json) => this.setState({ userid: json.id }));
      return this.setState({ access_token: tokenmatch[1] });
    } else {
      let url = `${host}/auth`;
      window.location.href = url;
    }
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
