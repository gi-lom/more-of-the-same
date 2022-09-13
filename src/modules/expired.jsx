export default function expired() {
    return localStorage.getItem("access_token") === null || parseInt(localStorage.getItem("expires_in")) < Math.floor(Date.now() / 1000)
}