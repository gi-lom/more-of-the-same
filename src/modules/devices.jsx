const getDevices = async () => {
	const devicesRetrieve = new Promise((resolve, reject) => {
    // Prima ottieni il genere dell'artista
    // Poi le caratteristiche della canzone
    //Infine chiedi le raccomandazioni
    fetch(
      "https://api.spotify.com/v1/me/player/devices",
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
    })
  }); 
  return await devicesRetrieve;
};

export default getDevices