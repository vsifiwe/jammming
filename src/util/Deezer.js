// const host = "http://localhost:3030"; // LocalHost
const host = "https://jammming-deezer.herokuapp.com";

const Deezer = {
  search(term) {
    return fetch(`${host}/search?term=${term}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        if (!json.data) return [];
        return json.data.map((track) => ({
          id: track.id,
          name: track.title,
          artist: track.artist.name,
          album: track.album.title,
        }));
      });
  },

  savePlaylist(playlistName, songs, token, userid) {
    return fetch(
      `${host}/createplaylist?userid=${userid}&name=${playlistName}&songs=${songs}&token=${token}`
    );
  },
};

export default Deezer;
