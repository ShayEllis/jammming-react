const clientID = "2798c076145e4c78bad17abb06c026bb";
const redirectURI = "http://localhost:3000/";
const baseAddress = "https://api.spotify.com/v1";
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
            const expiresIn = experationMatch[0];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            let accessUrl = "https://accounts.spotify.com/authorize?response_type=token";
            const scope = "user-read-private user-read-email";
            accessUrl += `&client_id=${encodeURIComponent(clientID)}`;
            accessUrl += `&scope=${encodeURIComponent(scope)}`;
            accessUrl += `&redirect_uri=${encodeURIComponent(redirectURI)}`;
            window.location = accessUrl;
        }
    },
    search(searchTerm) {
        let accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
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
    }
}

export default Spotify;