import React from 'react';
import PlaylistList from '../PlaylistList/PlaylistList';
import './AllPlaylists.css';

class AllPlaylists extends React.Component {
    render() {
        return (
            <div className="AllPlaylists">
                <h2>All Playlists</h2>
                <PlaylistList allPlaylists={this.props.allPlaylists}/>
            </div>
        )
    }
}

export default AllPlaylists;