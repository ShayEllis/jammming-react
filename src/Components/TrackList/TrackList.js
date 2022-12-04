import React from 'react';
import { Track } from '../Track/Track';
import "./TrackList.css";

export class TrackList extends React.Component {
    render() {
        const tracks = this.props.tracks.map(track => <Track track={track} key={track.id} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />);
        return (
            <div className="TrackList">
                <ul>
                    {tracks}
                </ul>
            </div>
        );
    }
};