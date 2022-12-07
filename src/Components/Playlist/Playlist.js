import React from 'react';
import { TrackList } from '../TrackList/TrackList'
import "./Playlist.css";

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
    savePlaylist() {
        this.props.onSave(this.props.playlistTracks);
    }
    render () {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange} />
                <button className="Playlist-save" onClick={this.savePlaylist}>SAVE TO SPOTIFY</button>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
            </div>
        );
    }
};