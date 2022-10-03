export default async function getSongToPlay(songs, deviceId) {
    let songPlayRetrieve = new Promise((resolve, reject) => {
        let songsString = "["+songs.map(s => '"'+s+'"').toString()+"]"
        console.log(songsString)
        fetch("https://api.spotify.com/v1/me/player/play?device_id="+deviceId, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            },
            body: '{"uris": ' + songsString + ', "position_ms": 0}'
        }).then((resp) => {
            if (resp.status >= 300) {
                console.log(resp.status)
                resolve({error: resp.status});
            }
            else
                resolve(resp);
        })
    })
    return await songPlayRetrieve
}