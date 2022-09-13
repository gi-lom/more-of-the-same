import React from "react"

import spotifyGetAccessToken from "./../modules/token.jsx";

import Footer from "./elements/header.jsx";

import '../style/pages/index.scss';

import indexHead from "../images/index-head.jpg";

import "@fontsource/raleway"

class MainPart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // if (!expired())
    //   window.location.replace("/search")
  }

  render() {
    return(
      <main>
        <title>More Of The Same</title>

        <div id="main-image">
          <img src={indexHead} id="index-head" />
        </div>


        <div id="main-part">
          <div id="main-title">
            MORE OF THE SAME
          </div>

          <div id="main-subtitle">
            Select a song. <br /> Play songs that sound just like it.
          </div>

          <div id="main-sub-subtitle">
            This website works only with Spotify.
          </div>

          <div id="login-button-section">
            <button id="login-button" className="no-error" onClick={spotifyGetAccessToken}>START</button>
          </div>
        
          <div className="cookie-alert">
            This website does NOT use third-party cookies, except those from Spotify.<br />
            No trackers are present, and the author of this website does not get any profit from the website.< br />
            HOWEVER, in order to work, it has to retrieve data from your Spotify account.<br />
            If you click on the login button, the author will take for granted you are fine with it.<br />
            <br />
            This website is not related to Spotify AB or any of its partners.<br />
          </div>
        </div>

        <Footer />
      </main>
    )
  }

}

export default MainPart
