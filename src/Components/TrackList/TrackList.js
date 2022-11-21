import React from 'react';
import { Track } from '../Track/Track';
import "./TrackList.css";

export class TrackList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="TrackList">
                <ul>
                    <Track />
                    <Track />
                    <Track />
                </ul>
            </div>
        );
    }
};