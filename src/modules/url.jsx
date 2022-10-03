import getRedirectURI from "./redirect";

export default function urlCompare() {
    if (window !== undefined) {
        let ur = window.location.href;
        let basic_ur = getRedirectURI(window.location);
        return ur.length > basic_ur.length + 1;
    }
    return false
};