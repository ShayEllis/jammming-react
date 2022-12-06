const clientID = "2798c076145e4c78bad17abb06c026bb";
const redirectURI = "http://localhost:3000/";
let accessToken;

const Spotify = {
    getAccessToken() {
        // see if there is a way to save token in browser 
        // also generate token when the page loads
        // currently the page clears and generates a token only when the search button is clicked
        // this causes current info to be cleared and searched a second time
        
        //After user redirect on login, restoring the search term from before the redirect
        //Ensure playlist information doesn’t get cleared if a user has to refresh their access token

        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/(?<=access_token=)([^&]*)/gi);
        const experationMatch = window.location.href.match(/(?<=expires_in=)([^&]*)/gi);

        if (accessTokenMatch && experationMatch) {
            accessToken = accessTokenMatch[0];
            const expiresIn = Number(experationMatch[0]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            let accessUrl = "https://accounts.spotify.com/authorize?response_type=token";
            const scope = "user-read-private playlist-modify-private user-library-read user-library-modify";
            accessUrl += `&client_id=${encodeURIComponent(clientID)}`;
            accessUrl += `&scope=${encodeURIComponent(scope)}`;
            accessUrl += `&redirect_uri=${encodeURIComponent(redirectURI)}`;
            window.location = accessUrl;
        }
    },
    search(searchTerm) {
        if (!searchTerm) {
            throw new SyntaxError("Search query is missing")
        }

        const accessToken = this.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
                if(!response.ok) {
                    throw response
                }
                return response.json();
            })
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },
    savePlaylist(playlistName, tracks) {
        if (!playlistName || !tracks.length) {
            throw new SyntaxError("Playlist name missing or no tracks were added.")
        }

        accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`}
        const spotifyPlaylistInfo = {
            name: playlistName,
            public: false
        }
            
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
            ).then(response => response.json()
            ).then(jsonResponse => {
                const userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: {
                        ...headers,
                        'Content-Type': "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify(spotifyPlaylistInfo)
                }).then(response => response.json())
            }).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(tracks)
                }).then(response => {
                    return response.json();
                }).then(jsonResponse => {
                    return jsonResponse.snapshot_id;
                })
            })
    },
    getAllPlaylists() {
        accessToken = this.getAccessToken();

        const getPlaylists = async (accessToken) => {
            const response = await fetch('https://api.spotify.com/v1/me/playlists', { headers: { Authorization: `Bearer ${accessToken}` } });
            const jsonResponse = await response.json();
            return jsonResponse.items.map(playlist => ({
                name: playlist.name,
                id: playlist.id
            }));
        }

        return getPlaylists(accessToken);
    },
    async getSavedTracks() {
        accessToken = this.getAccessToken();
        const headers = { headers: { Authorization: `Bearer ${accessToken}` } }
        let url = `https://api.spotify.com/v1/me/tracks?limit=50&offset=0`;
        let allTracks = [];

        do {
            const response = await fetch(url, headers);
            const jsonResponse = await response.json();
            const tracks = jsonResponse.items.map(track => ({
                dateAdded: track.added_at,
                id: track.track.id,
                name: track.track.name,
                artist: track.track.artists[0].name,
                album: track.track.album.name,
                uri: track.track.uri
            }));
            allTracks = allTracks.concat(tracks);
            url = jsonResponse.next;
        } while (url)

        return allTracks;
     }
}

export default Spotify;