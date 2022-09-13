export default function handleError() {
  window.alert("An error has occurred. You'll be now redirected to the initial page")
  localStorage.clear()
  window.location.replace("/")
}