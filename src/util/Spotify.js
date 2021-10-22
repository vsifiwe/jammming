let accesstoken = null;
let expirationtime = null;
const client_id = "508caca746584167a95c1d4a57a89a84";
const redirect_uri = "http://localhost:3000/";
let playlistID = null;

const Spotify = {
  getAccessToken() {
    if (accesstoken) return accesstoken;

    const tokenmatch = window.location.href.match(/access_token=([^&]*)/);
    const expirationmatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenmatch && expirationmatch) {
      accesstoken = tokenmatch[1];
      expirationtime = expirationmatch[1];
      window.setTimeout(() => (accesstoken = ""), expirationtime * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;

      window.location.href = url;
    }
  },
  search(term) {
    const token = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.tracks) return [];
        return json.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
  savePlaylist(playlistName, uris) {
    if (!playlistName || !uris) return;
    let token = this.getAccessToken();
    let header = {
      Authorization: `Bearer ${token}`,
    };
    let userid = "";

    return fetch("https://api.spotify.com/v1/me", { headers: header })
      .then((response) => response.json())
      .then((json) => {
        userid = json.id;

        return fetch(`https://api.spotify.com/v1/users/${userid}/playlists`, {
          headers: header,
          method: "POST",
          body: JSON.stringify({
            name: playlistName,
            description: "Made with Jammming App by Manzi Asifiwe",
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            playlistID = json.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
              {
                method: "POST",
                headers: header,
                body: JSON.stringify({ uris }),
              }
            );
          });
      });
  },
};

export default Spotify;
