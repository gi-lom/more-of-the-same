import React from "react";

const PlaylistList = (props) => {
  const list = props.list

  let songs = []
  for (let i=0; i<list.length; i++)
    songs.push(
      <div className="playlist-songs-list-el">
        <div className="playlist-songs-list-el-details">
          <div className="playlist-songs-list-img">
            <img src={list[i].album.images[2].url} />
          </div>
          <div className="playlist-songs-list-el-details-text">
            <div className="playlist-songs-list-el-details-title">
              {list[i].name}
            </div>
            <div className="playlist-songs-list-el-details-artist">
              {list[i].artists.map((el) => el.name).join(", ")}
            </div>
          </div>
        </div>
        <div className="playlist-songs-list-button">
          <button onClick={() => window.open(list[i].external_urls.spotify, "_blank").focus()}> Play on Spotify </button>
        </div>
      </div>
    )

  return (
    <div id="playlist-songs-list">
      {songs}
    </div>
  )
}

export default PlaylistList