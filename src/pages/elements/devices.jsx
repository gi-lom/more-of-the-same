import React from "react";
import { motion } from "framer-motion";

import handleError from "../../modules/error";
import getSongToPlay from "../../modules/song-play";

import Automobile from "../../images/Automobile.svg";
import Cast_audio from "../../images/Cast_audio.svg";
import Cast_video from "../../images/Cast_video.svg";
import Computer from "../../images/Computer.svg";
import Game_console from "../../images/Game_console.svg";
import generic from "../../images/generic.svg";
import Smartphone from "../../images/Smartphone.svg";
import Speaker from "../../images/Speaker.svg";
import Tablet from "../../images/Tablet.svg";
import Tv from "../../images/Tv.svg";

const prepareDevice = (deviceId, songs) => {
  getSongToPlay(songs, deviceId).then((resp) => {
    if ("error" in resp) {
      if (resp.error == 502)
        window.alert("Couldn't open it. Did you recently close this session?");
      else handleError();
    }
  });
};

const DeviceButtons = (devices, songs, transitionSt) => {
  let buttonList = [];
  if (devices !== undefined)
    for (let i = 0; i < devices.length; i++) {
      let img = generic;
      switch (devices[i].type) {
        case "Automobile":
          img = Automobile;
          break;
        case "Cast_audio":
          img = Cast_audio;
          break;
        case "Cast_video":
          img = Cast_video;
          break;
        case "Computer":
          img = Computer;
          break;
        case "Game_console":
          img = Game_console;
          break;
        case "Smartphone":
          img = Smartphone;
          break;
        case "Speaker":
          img = Speaker;
          break;
        case "Tablet":
          img = Tablet;
          break;
        case "Tv":
          img = Tv;
          break;
      }
      buttonList.push(
        <motion.button
          onClick={() => prepareDevice(devices[i].id, songs)}
          className="device-button"
          initial={{ opacity: 0, x: 0, y: 5, ease: "easeOut" }}
          animate={
            transitionSt === "exiting"
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 1, x: 0, y: 0 }
          }
          transition={
            transitionSt === "exiting"
              ? { duration: 0.5, ease: "easeIn", delay: 0.25 * i }
              : { duration: 0.5, ease: "easeOut", delay: 0.25 * i }
          }
        >
          <div className="image-container">
            <img src={img} className="svg not-hover" />
            <img src={img} className="svg hover" />
          </div>
          <div className="device-details">
            <div className="device-type"> {devices[i].type} </div>
            <div className="device-name"> {devices[i].name} </div>
          </div>
        </motion.button>
      );
    }
  console.log(buttonList)
  return <div id="devices-list">{buttonList}</div>;
};

const Devices = (props) => {
  let deviceButtons = DeviceButtons(props.devices, props.songs, props.transitionSt);
  return (
    <motion.div
      id="devices"
      initial={{ opacity: 0, x: 0, y: 5, ease: "easeOut" }}
      animate={
        props.transitionSt === "exiting"
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 1, x: 0, y: 0 }
      }
      transition={
        props.transitionSt === "exiting"
          ? { duration: 1, ease: "easeIn" }
          : { duration: 1 }
      }
    >
      <div id="devices-title">
        Select a device to start playing. <br />
        If you don't see the one you want to use, open a Spotify session there
        and refresh.
      </div>
      {deviceButtons}
    </motion.div>
  );
};

export default Devices;
