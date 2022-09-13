import React from "react"

import Automobile from "../../images/Automobile.svg"
import Cast_audio from "../../images/Cast_audio.svg"
import Cast_video from "../../images/Cast_video.svg"
import Computer from "../../images/Computer.svg"
import Game_console from "../../images/Game_console.svg"
import generic from "../../images/generic.svg"
import Smartphone from "../../images/Smartphone.svg"
import Speaker from "../../images/Speaker.svg"
import Tablet from "../../images/Tablet.svg"
import Tv from "../../images/Tv.svg"

const DeviceButtons = (devices, prepareDevice) => {
  let buttonList = []
  for (let i = 0; i < devices.length; i++) {
    let img = generic
    switch (devices[i].type) {
      case "Automobile": img = Automobile; break;
      case "Cast_audio": img = Cast_audio; break;
      case "Cast_video": img = Cast_video; break;
      case "Computer": img = Computer; break;
      case "Game_console": img = Game_console; break;
      case "Smartphone": img = Smartphone; break;
      case "Speaker": img = Speaker; break;
      case "Tablet": img = Tablet; break;
      case "Tv": img = Tv; break;
    }
    buttonList.push(
      <button onClick={() => prepareDevice(devices[i].id)} className="device-button">
        <img src={img} className="device-img" />
        <div className="device-name"> {devices[i].name} </div>
        <div className="device-type"> {devices[i].type} </div>
      </button>
    )
  }
  return buttonList
}

const YesDevices = (devices, prepareDevice) => {
  let deviceButtons = DeviceButtons(devices, prepareDevice)
  return (
    <div>
      Select one of the devices below to start playing. <br />
      If you don't see the one you want to use, open a Spotify session there and push the "Make my playlist" button again.
      {deviceButtons}
    </div>
  )
}

const NoDevices = () => {
  return (
    <div>
      But you haven't opened any Spotify player.<br />
      Start a Spotify session from any devices and push the "Make my playlist" button again.
    </div>
  )
}

const Popup = props => {
  const prompt = props.devices.length > 0 ? YesDevices(props.devices, props.prepareDevice) : NoDevices()
  return (
    <div>
      <div>Your playlist is ready!</div>
      {prompt}
    </div>
  )
}

export default Popup;