import React from "react"
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = props => {
  
  if (props.tracks !== null)
    return (
      <SpotifyPlayer
        token={localStorage.getItem("access_token")}
        uris={[props.tracks.uri]}
      />
    )

  return <div />

}
export default Player;