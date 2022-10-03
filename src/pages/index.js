import React from "react";

import spotifyGetAccessToken from "./../modules/token.jsx";

import Footer from "./elements/footer.jsx";

import "../style/pages/index.scss";

import indexHead from "../images/index-head-transparent.png";
import spotifyLogo from "../images/spotify.png"

import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

class MainPart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // if (!expired())
    //   window.location.replace("/search")
  }

  render() {
    return (
      <div id="index">
        <title>More Of The Same</title>

        <div id="main">
          <div id="main-image">
            <img src={indexHead} id="index-head" />
          </div>

          <div id="main-part">
            <div id="main-title">More Of The Same</div>

            <div id="main-subtitle">
              Select a song. Play songs that sound just like it.
            </div>

            <div id="main-sub-subtitle">
              <div id="header-title">
                <div id="header-title-logo">
                  <div id="header-title-logo-title">Powered by</div>
                  <div id="header-title-logo-container">
                    <img src={spotifyLogo} />
                  </div>
                </div>
              </div>
            </div>

            <div id="login-button-section">
              <button
                id="login-button"
                className="no-error"
                onClick={spotifyGetAccessToken}
              >
                START
              </button>
            </div>
          </div>
        </div>

        <div id="cookie-alert">
          This website does NOT use third-party cookies, except those from
          Spotify. No trackers are present, and the author of this website does
          not get any profit from the website.
          <br />
          HOWEVER, in order to work, it has to retrieve data from your Spotify
          account. If you click on the login button, the author will take for
          granted you are fine with it.
          <br />
          <br />
          This website is not related to Spotify AB or any of its partners.
          <br />
        </div>

        <Footer />
      </div>
    );
  }
}

export default MainPart;
