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
            name: "Playlist Track 1",
            artist: "Playlist Artist 1",
            album: "Playlist Album 1",
            id: 4
          }
        ]
      }
    };
  }
  addTrack(track) {

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlist.playlistName} playlistTracks={this.state.playlist.tracks} />
          </div>
        </div>
      </div>
    );
  }
};


export default App;