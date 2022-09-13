export default async function getSongToPlay(songs, deviceId) {
    let songPlayRetrieve = new Promise((resolve, reject) => {
        fetch("https://api.spotify.com/v1/me/player/play?device_id="+deviceId, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            },
            body: '{"uris": ' + songs + ', "position_ms": 0}'
        }).then((resp) => {
            if (resp.status >= 300)
                resolve({error: resp.status});
            else
                resolve(resp);
        })
    })
    return await songPlayRetrieve
}