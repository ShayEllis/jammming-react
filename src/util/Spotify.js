let accessToken = "";
const clientID = "2798c076145e4c78bad17abb06c026bb";
const redirectURI = "http://localhost:3000/";
const baseAddress = "https://api.spotify.com";

const Spotify = {
    getAccessToken(url="") {
        if (accessToken) {
            return accessToken;
        }

        accessToken = url.match(/(?<=access_token=)([^&]*)/gi);
        let experation = url.match(/(?<=expires_in=)([^&]*)/gi);

        if (accessToken && experation) {
            accessToken = accessToken[0];
            experation = experation[0];
            setTimeout(() => accessToken = '', experation * 1000);
            history.pushState('Access Token', null, '/');
        } else {
            location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    }
}

Spotify.getAccessToken()

export default Spotify;