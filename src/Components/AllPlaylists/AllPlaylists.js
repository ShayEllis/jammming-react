import React from 'react';
import ListOfPlaylists from '../ListOfPlaylists/ListOfPlaylists';
import './AllPlaylists.css';

class AllPlaylists extends React.Component {
    render() {
        return (
            <div className="AllPlaylists">
                <h2>All Playlists</h2>
                <ListOfPlaylists allPlaylists={this.props.allPlaylists}/>
            </div>
        )
    }
}

export default AllPlaylists;