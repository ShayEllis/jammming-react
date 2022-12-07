import React from 'react';
import './PlaylistRow.css';

class PlaylistRow extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.loadPlaylistInfo(this.props.name, this.props.playlistId)
    }
    render() {
        return (
            <li className="PlaylistRow">
                <div className="PlaylistRow-information">
                    <h3 onClick={this.handleClick}>{this.props.name}</h3>
                </div>
            </li>
        )
    }
}

export default PlaylistRow;