import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "first",
          artist: "first",
          album: "first",
          id: 1
        },
        {
          name: "Second",
          artist: "Second",
          album: "Second",
          id: 2
        },
        {
          name: "Third",
          artist: "Third",
          album: "Third",
          id: 3
        }
      ],
      playlistName: "My New Playlist",
      playlistTracks: [
        {
          name: "Playlist Track 2",
          artist: "Playlist Artist 2",
          album: "Playlist Album 2",
          id: 5
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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
    return tracks.map(track => track.uri);
  }
  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({ searchResults:  results})
    })
  }

  //Save a user's playlist to their Spotify account
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
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
};


export default App;