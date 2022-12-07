import React from "react";
import AllPlaylists from '../AllPlaylists/AllPlaylists';
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      allPlaylists: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.loadPlaylistInfo = this.loadPlaylistInfo.bind(this);

  }
  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }
  addTrack(newTrack) {
    const playlistHasTrack = this.state.playlistTracks.findIndex(track => track.id === newTrack.id) !== -1;

    if (!playlistHasTrack) {
      this.setState((prevState) => (
        { playlistTracks: [...prevState.playlistTracks, newTrack] }
        ));
    };
  }
  removeTrack(trackToRemove) {
    const newTrackList = this.state.playlistTracks.filter((track) => track.id !== trackToRemove.id)

    this.setState({ playlistTracks: [...newTrackList] })
  }
  savePlaylist(tracks) {
    const trackList = tracks.map(track => track.uri);

    try {
      Spotify.savePlaylist(this.state.playlistName, trackList).then(() => {
        this.setState({
          playlistName: "New Playlist",
          playlistTracks: []
        });
        alert("The playlist has been saved to your Spotify account!");
      });
    } catch (e) {
      if (e instanceof SyntaxError) {
        alert(e.message);
      }
    }
  }
  search(searchTerm) {
    try {
      Spotify.search(searchTerm).then(results => {
        this.setState({ searchResults: results})
      })
    } catch(e) {
      if (e instanceof SyntaxError) {
        alert(e.message);
      }
    }
  }
  loadAllPlaylists() {
    Spotify.getAllPlaylists().then(results => {
      this.setState({ allPlaylists: [{ name: "Liked Songs", id: "likedSongs" }, ...results] }) //Working on this
    })
  }
  loadSavedTracks() {
    Spotify.getSavedTracks().then(results => {
      this.setState({ 
        playlistName: "Liked Songs",
        playlistTracks: results
      })
    })
  }
  loadPlaylistInfo(playlistName) {
    if (playlistName === "Liked Songs") {
      this.loadSavedTracks();
      //alert(`${playlistName} loaded.`);
    }

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          <div className="App-playlist">
            <AllPlaylists 
              allPlaylists={this.state.allPlaylists}
              loadPlaylistInfo={this.loadPlaylistInfo}
            />
            <SearchResults 
              searchResults={this.state.searchResults} 
              onSearch={this.search}
              onAdd={this.addTrack} 
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              onNameChange={this.updatePlaylistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    Spotify.getAccessToken();
    this.loadAllPlaylists();
  }
};


export default App;