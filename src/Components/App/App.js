import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
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
      playlist: {
        playlistName: "My New Playlist",
        tracks: [
          {
            name: "Playlist Track 2",
            artist: "Playlist Artist 2",
            album: "Playlist Album 2",
            id: 5
          }
        ]
      }
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(newTrack) { //Test and remove console.logs if it works
    const playlistHasTrack = this.state.playlist.tracks.findIndex(track => track.id === newTrack.id) !== -1;

    if (!playlistHasTrack) {
      this.setState((prevState) => (
        { playlist: { tracks: [...prevState.playlist.tracks, newTrack] } }
        ));
    };
  }
  removeTrack(trackToRemove) {
    const newTrackList = this.state.playlist.tracks.filter((track) => track.id !== trackToRemove.id)

    this.setState({ playlist: { tracks: [...newTrackList] } })
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlist.playlistName} playlistTracks={this.state.playlist.tracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
};


export default App;