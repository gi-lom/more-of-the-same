import React from "react";
import { motion } from "framer-motion";
import { TransitionState } from "gatsby-plugin-transition-link";

import getDevices from "../modules/devices";
import retrievePlaylist from "../modules/retrieve-playlist";
import handleError from "../modules/error";

import Header from "./elements/header";
import Devices from "./elements/devices";
import PlaylistList from "./elements/playlistList";

import NoDevices from "../images/no-devices.svg";

import "../style/pages/result.scss";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      songs: null,
    };
  }

  componentDidMount() {
    let songRetrieve =
      typeof window === "undefined" || !window
        ? null
        : JSON.parse(sessionStorage.getItem("song"));
    let optionsRetrieve =
      typeof window === "undefined" || !window
        ? null
        : JSON.parse(sessionStorage.getItem("options"));
    retrievePlaylist(songRetrieve, optionsRetrieve).then((playlist) => {
      if ("error" in playlist) {
        handleError();
      } else {
        if (playlist === null || playlist.tracks.length === 0) {
          window.alert(
            "Spotify did not find any songs to recommend. This usually happens with songs that haven't been listened to enough worldwide. You'll be now redirected to the search page."
          );
          window.location.replace("/search");
        } else {
          getDevices().then((resp) => {
            if ("error" in playlist) handleError();
            else {
              this.setState({ devices: resp.devices });
              this.setState({
                songs: playlist.tracks,
              });
            }
          });
        }
      }
    });
  }

  render() {

    const playlistWasNotRetrieved = (
      <div id="playlist-not-retrieved">Getting the songs, please wait...</div>
    );

    const deviceChooser = (transitionSt) => {
      return this.state.devices == null || this.state.devices.length == 0 ? (
        <motion.div
          id="no-device"
          initial={{ opacity: 0, x: 0, y: 5, ease: "easeOut" }}
          animate={
            transitionSt === "exiting"
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 1, x: 0, y: 0 }
          }
          transition={
            transitionSt === "exiting"
              ? { duration: 1, delay: 0.05 }
              : { duration: 1, delay: 0.05 }
          }
        >
          <div id="no-device-img">
            <img src={NoDevices} />
          </div>
          <div id="no-device-message">
            You haven't opened any Spotify player.
            <br />
            Start a Spotify session from any device and refresh the page.
          </div>
        </motion.div>
      ) : (
        <Devices
          devices={this.state.devices}
          songs={this.state.songs.map((song) => song.uri)}
          transitionSt={transitionSt}
        />
      );
    };

    const playlistWasRetrieved = (transitionSt) => {
      return (
        <div id="playlist">
          {deviceChooser(transitionSt)}
          <div id="playlist-songs">
            <motion.div
              id="playlist-songs-title"
              initial={{
                opacity: 0,
                ease: "easeOut",
              }}
              animate={
                transitionSt === "exiting"
                  ? { opacity: 1 }
                  : { opacity: 1 }
              }
              transition={
                transitionSt === "exiting"
                  ? { duration: 1 }
                  : { duration: 1, delay: 0.5 }
              }
            >
              Want to play songs individually? Here they are.
            </motion.div>
            <PlaylistList list={this.state.songs} transitionSt={transitionSt} />
          </div>
        </div>
      );
    };

    const wasPlaylistRetrieved = (transitionSt) => {
      return this.state.songs == null
        ? playlistWasNotRetrieved
        : playlistWasRetrieved(transitionSt);
    };

    return (
      <main>
        <title>More Of The Same</title>

        <Header />

        <TransitionState>
          {({ transitionStatus, entry, exit }) => {
            if (transitionStatus == "entering" || transitionStatus == "exiting")
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  ease: "easeOut",
                }}
                animate={
                  transitionStatus === "exiting"
                    ? { opacity: 0, x: 0, y: 0 }
                    : { opacity: 1, x: 0, y: 0 }
                }
                transition={
                  transitionStatus === "exiting"
                    ? { duration: 1 }
                    : { duration: 1 }
                }
              >
                {wasPlaylistRetrieved(transitionStatus)}
              </motion.div>
            );
          }}
        </TransitionState>
      </main>
    );
  }
}

export default Result;
