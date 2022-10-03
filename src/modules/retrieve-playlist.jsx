const retrieveGenres = async (artists) => {
  const genreRetrieve = new Promise((resolve, reject) => {
    let artist_string = artists.map((artist) => artist.id).join("%2C")
    fetch(
      "https://api.spotify.com/v1/artists?ids=" + artist_string,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    ).then((resp) => {
      if (resp.status === 204 || resp.status >= 300)
        resolve({ error: resp.status });
      else
        resolve(resp.json())
    });
  });
  return await genreRetrieve
};

const elaborateGenres = (genres_raw) => {
  let artists = genres_raw.artists
    let genres = []
    for (let i = 0; i  < artists.length; i++)
      for (let j = 0; j < artists[i].genres.length; j++)
        genres.push(artists[i].genres[j])
    if (genres.length == 0)
      return {error: "no-genres"}
    let frequencies = {}
    let uniqGenres = []
    for (let i = 0; i < genres.length; i++) {
      frequencies[genres[i]] = frequencies[genres[i]] ? frequencies[genres[i]] + 1 : 1
      if (!(uniqGenres.includes(genres[i])))
        uniqGenres.push(genres[i])
    }
    uniqGenres.sort( (a, b) => frequencies[b] - frequencies[a])
    let maxNum = uniqGenres.length > 2 ? 2 : uniqGenres.length
    return uniqGenres.slice(0, maxNum).join(",").split(" ").join("%20")
}

const retrieveOptions = async (song) => {
  const optionRetrieve = new Promise((resolve, reject) => {   
    fetch(
      "https://api.spotify.com/v1/audio-features/" + song.id,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    ).then((resp) => {
      if (resp.status === 204 || resp.status >= 300)
        resolve({ error: resp.status });
      else
        resolve(resp.json())
    });
  });
  return await optionRetrieve
};

const elaborateOptions = (options, optionsStats) => {
  let optionsStatsFiltered = {}
  let keys = Object.keys(options)
  let optionsString = []
  for (let i = 0; i < keys.length; i++)
    if (options[keys[i]])
      // sono tutti int
      switch (options[keys[i]]) {
            case "duration_ms":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - 5000));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + 5000));
              break;
            case "key":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]]));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]]));
              break;
            case "mode":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]]));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]]));
              break;
            case "tempo":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - optionsStats[keys[i]]*5.0/100.0));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + optionsStats[keys[i]]*5.0/100.0));
              break;
            case "acousticness":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - 0.05));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + 0.05));
              break;
            case "danceability":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - 0.05));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + 0.05));
              break;
            case "energy":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - 0.05));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + 0.05));
              break;
            case "liveness":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - 0.05));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + 0.05));
              break;
            case "loudness":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - 3.0));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + 3.0));
              break;
            case "valence":
              optionsString.push("min_"+keys[i]+"="+(optionsStats[keys[i]] - 0.05));
              optionsString.push("max_"+keys[i]+"="+(optionsStats[keys[i]] + 0.05));
              break;
            default: break;
      }
      // optionsString.push("target_"+keys[i]+"="+optionsStats[keys[i]])
  return optionsString.join("&")
}

const elaborateArtists = (artists) => {
  let realArtists = artists.length > 2 ? artists.slice(2) : artists
  return realArtists.map((artist) => artist.id).join(",")
}

const retrieveSongs = async (song, options, genres, artists) => {
  const songRetrieve = await new Promise((resolve, reject) => {
    let st = "https://api.spotify.com/v1/recommendations?limit=100"
    st += "&seed_artists=" + artists
    st += "&seed_genres=" + genres
    st += "&seed_tracks=" + song
    st += "&" + options
    console.log(st)
    fetch(st,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    ).then((resp) => {
      if (resp.status === 204 || resp.status >= 300)
        resolve({ error: resp.status });
      else
        resolve(resp.json())
    });
  });
  return await songRetrieve
};

export default async function retrievePlaylist(song, selectedOptions) {
  const songListRetrieve = new Promise((resolve, reject) => {
    // Prima ottieni il genere dell'artista
    // Poi le caratteristiche della canzone
    //Infine chiedi le raccomandazioni
    let genres = null
    let optionsStats = null
    retrieveGenres(song.artists).then((genres_raw) => {
      if ("error" in genres_raw)
        resolve(genres_raw)
      genres = elaborateGenres(genres_raw)
      retrieveOptions(song).then((options_raw) => {
        if ("error" in options_raw)
          resolve(options_raw)
        optionsStats = elaborateOptions(selectedOptions, options_raw)
        let artists = elaborateArtists(song.artists)
        retrieveSongs(song.id, optionsStats, genres, artists).then((resp) => {
          resolve(resp)
        })
      })
    })
  });
  return await songListRetrieve;
}