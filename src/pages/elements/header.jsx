import React from "react";

import spotifyLogo from "../../images/spotify.png"

const logout = () => {
  if (window.confirm("This will log you out of Spotify in the whole browser. Continue?")) {
    localStorage.clear()
    sessionStorage.clear()
    const url = 'https://accounts.spotify.com/logout'
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    const timeout = Promise.resolve(setTimeout(() => spotifyLogoutWindow.close(), 100))
    timeout.then(() => { window.location.replace("/") } )
  }
}

const Header = () => {
  return (
    <header>
      <div id="header-title">
        <div id="header-title-app">
          More Of The Same
        </div>
        <div id="header-title-logo">
          <div id="header-title-logo-title">Powered by</div>
          <div id="header-title-logo-container">
            <img src={spotifyLogo} />
          </div>
        </div>
      </div>
      <button id="logout" onClick={logout}>
        Logout
      </button>
    </header>
  )
}

export default Header