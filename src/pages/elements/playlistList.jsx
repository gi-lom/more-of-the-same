import React from "react";
import { motion } from "framer-motion";

const PlaylistList = (props) => {
  const list = props.list;

  let songs = [];
  if (list !== undefined)
    for (let i = 0; i < list.length; i++)
      songs.push(
        <motion.div
          className="playlist-songs-list-el"
          initial={{ opacity: 0, x: window.innerWidth, y: 0, ease: "easeOut" }}
          animate={
            props.transitionSt === "exiting"
              ? { opacity: 1, x: -window.innerWidth, y: 0 }
              : { opacity: 1, x: 0, y: 0 }
          }
          transition={
            props.transitionSt === "exiting"
              ? { duration: 2, delay: 0.05 * i }
              : { duration: 1.25, delay: 0.5 + 0.05 * i }
          }
        >
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
            <button
              onClick={() =>
                window.open(list[i].external_urls.spotify, "_blank").focus()
              }
            >
              {" "}
              Play on Spotify{" "}
            </button>
          </div>
        </motion.div>
      );

  return <div id="playlist-songs-list">{songs}</div>;
};

export default PlaylistList;
