import React from "react";

import getDevices from "../modules/devices";
import retrievePlaylist from "../modules/retrieve-playlist";
import handleError from "../modules/error";

import Header from "./elements/header";
import Devices from "./elements/devices";
import PlaylistList from "./elements/playlistList";

import NoDevices from "../images/no-devices.svg"

import '../style/pages/result.scss';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      songs: null
    }
  }

  componentDidMount() {
    retrievePlaylist(
      this.props.location.state.song,
      this.props.location.state.options,
      this.props.location.state.fullOptions,
    ).then((playlist) => {
      if ("error" in playlist) { handleError(); }
      else {
        if (playlist === null || playlist.tracks.length === 0) {
          window.alert(
            "Spotify did not find any songs to recommend. This usually happens with songs that haven't been listened to enough worldwide. You'll be now redirected to the search page."
          );
          window.location.replace("/search");
        } else {
          getDevices().then((resp) => {
            if ("error" in playlist) handleError();
            else {
              console.log(playlist)
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
      <div id="playlist-not-retrieved">
        Getting the songs, please wait...
      </div>
    )

    const deviceChooser = this.state.devices == null || this.state.devices.length == 0 ?
      (
        <div id="no-device">
          <div id="no-device-img">
            <img src={NoDevices} />
          </div>
          <div id="no-device-message">
            You haven't opened any Spotify player.<br />
            Start a Spotify session from any device and refresh the page.
          </div>
        </div>
      )
      :
        <Devices devices={this.state.devices} songs={this.state.songs.map((song) => song.uri)} />

    const playlistWasRetrieved = (
      <div id="playlist">
        {deviceChooser}
        <div id="playlist-songs">
          <div id="playlist-songs-title">
            Want to play songs individually? Here they are.
          </div>
          <PlaylistList list={this.state.songs} />
        </div>
      </div>
    )

    const wasPlaylistRetrieved = this.state.songs == null ? playlistWasNotRetrieved : playlistWasRetrieved

    return (
      <main>
        <title>More Of The Same</title>

        <Header />

        {wasPlaylistRetrieved}

      </main>
    );
  }

}

export default Result;
