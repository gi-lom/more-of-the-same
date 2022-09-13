export default function getRedirectURI (loc) {
    let uri = loc.origin + loc.pathname;
    let ur = uri.replace(/\/$/, "")
    return ur;
  };