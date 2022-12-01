const clientID = "2798c076145e4c78bad17abb06c026bb";
const redirectURI = "http://localhost:3000/";
let accessToken;

const Spotify = {
    getAccessToken() {
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
            const scope = "user-read-private playlist-modify-private";
            accessUrl += `&client_id=${encodeURIComponent(clientID)}`;
            accessUrl += `&scope=${encodeURIComponent(scope)}`;
            accessUrl += `&redirect_uri=${encodeURIComponent(redirectURI)}`;
            window.location = accessUrl;
        }
    },
    search(searchTerm) {
        const accessToken = Spotify.getAccessToken(); // can "this" be used?

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                };
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
            return
        }
        accessToken = Spotify.getAccessToken();
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
    }
}

export default Spotify;