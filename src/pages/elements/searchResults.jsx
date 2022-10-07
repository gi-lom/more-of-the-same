import React from "react";
import { motion } from "framer-motion";
import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link";
import gsap from "gsap";

import SearchNofound from "../../images/search-nofound.svg";

const SongList = (songs, transitionStatus, entry, exit) => {
  let list = songs.tracks.items;
  let buttonList = [];
  for (let i = 0; i < list.length; i++) {
    let current = list[i];
    let artistList = current.artists.map((el) => el.name).join(", ");
    let imageSrc = current.album.images[current.album.images.length - 1].url;
    buttonList.push(
      <div className="search-result-container">
        <motion.div
          initial={{ opacity: 0, x: window.innerWidth, y: 0, ease: "easeOut" }}
          animate={
            transitionStatus === "exiting"
              ? { opacity: 1, x: -window.innerWidth, y: 0 }
              : { opacity: 1, x: 0, y: 0 }
          }
          transition={
            transitionStatus === "exiting"
              ? { duration: 2, delay: 0.05 * i }
              : { duration: 1.25, delay: 0.05 * i }
          }
        >
          <button className="search-result">
            <TransitionLink
              to={"/config"}
              onClick={() => {
                sessionStorage.setItem("song", JSON.stringify(current));
              }}
              style={{ textDecoration: "none", color: "#4C4C7A" }}
              exit={{
                length: 2,
                ease: "easeOut",
                state: { x: window.innerWidth / 2, opacity: 0 },
              }}
              entry={{
                delay: 1,
                ease: "easeOut",
                state: { x: -window.innerWidth / 2, opacity: 0 },
              }}
            >
              <div>
                <div className="search-result-button-img">
                  <img src={imageSrc} />
                </div>
                <div className="search-result-button-text">
                  <div className="search-result-button-name">
                    {" "}
                    {current.name}{" "}
                  </div>
                  <div className="search-result-button-artists">
                    {" "}
                    {artistList}{" "}
                  </div>
                </div>
              </div>
            </TransitionLink>
          </button>
          <button
            className="play-on-spotify"
            onClick={() =>
              window.open(current.external_urls.spotify, "_blank").focus()
            }
          >
            Play on Spotify
          </button>
        </motion.div>
      </div>
    );
  }
  return <div id="search-results">{buttonList}</div>;
};

const SearchResults = (props) => {
  const songs = props.songs;
  if (typeof window !== "undefined" && window) {
    if (songs !== undefined && songs !== null) {
      if (songs.tracks.items.length == 0)
        return (
          <>
            <div className="generic-search-background">
              <img src={SearchNofound} />
              <div className="generic-search-title">Nothing found</div>
            </div>
          </>
        );
      else {
        const list = SongList(
          songs,
          props.transitionStatus,
          props.entry,
          props.exit
        );
        return <div id="search-results-box">{list}</div>;
      }
    } else return <div />;
  } else return <div />;
};

export default SearchResults;
