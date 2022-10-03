export default async function songSearch(key, offset) {
    let songListRetrieve = new Promise((resolve, reject) => {
        fetch("https://api.spotify.com/v1/search?q=" + key.replace(" ","%20") + "&type=track&limit=20&offset=" + offset*10, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
        }).then((resp) => {
            if (resp.status === 204 || resp.status >= 300)
                resolve({error: resp.status});
            else
                resolve(resp.json());
        })
    })
    return await songListRetrieve
}