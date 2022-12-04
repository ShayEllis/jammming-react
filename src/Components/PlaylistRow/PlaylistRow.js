import React from 'react';
import './PlaylistRow.css';

class PlaylistRow extends React.Component {
    render() {
        return (
            <li className="PlaylistRow">
                <div className="PlaylistRow-information">
                    <h3>{this.props.name}</h3>
                </div>
            </li>
        )
    }
}

export default PlaylistRow;