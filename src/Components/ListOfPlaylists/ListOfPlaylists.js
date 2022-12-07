import React from 'react';
import PlaylistRow from '../PlaylistRow/PlaylistRow'
import './ListOfPlaylists.css';

class ListOfPlaylists extends React.Component {
    render() {
        const playlistItem = this.props.allPlaylists.map(playlist => <PlaylistRow key={playlist.id} name={playlist.name} loadPlaylistInfo={this.props.loadPlaylistInfo}/>)

        return (
            <div>
                <ul>
                    {playlistItem}
                </ul>
            </div>
        )
    }
}

export default ListOfPlaylists;