export default function handleError() {
  window.alert("An error has occurred or your authorization expired. You'll be now logged out.")
  localStorage.clear()
  sessionStorage.clear()
  const url = 'https://accounts.spotify.com/logout'
  const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
  const timeout = Promise.resolve(setTimeout(() => spotifyLogoutWindow.close(), 100))
  timeout.then(() => { window.location.replace("/") } )
}