import getRedirectURI from "./redirect";


const generateRandomString = length => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


export default function spotifyGetAccessToken () {
    // authorize user and get access token
    const SPOTIFY_CLIENT_ID = "2a60345a24c741afaf8259f0d8545686";
    const scopes = [
      "user-modify-playback-state",
      "user-read-playback-state"
    ];
    let url = "https://accounts.spotify.com/authorize";
    let state = generateRandomString(16);
    localStorage.setItem("spotify_auth_state", state);

    url += "?client_id=" + encodeURIComponent(SPOTIFY_CLIENT_ID);
    url += "&redirect_uri=" + encodeURIComponent(getRedirectURI(window.location) + "/search");
    url += "&scope=" + scopes.join("%20");
    url += "&response_type=token";
    url += "&state=" + encodeURIComponent(state);
    window.location = url;
}