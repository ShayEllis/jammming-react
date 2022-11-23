import React from 'react';
import { Track } from '../Track/Track';
import "./TrackList.css";

export class TrackList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const tracks = this.props.tracks.map(track => <Track trackName={track.name} trackArtist={track.artist} trackAlbum={track.album} key={track.id} />);

        return (
            <div className="TrackList">
                <ul>
                    {tracks}
                </ul>
            </div>
        );
    }
};