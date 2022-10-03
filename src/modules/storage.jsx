import urlCompare from "./url";
import expired from "./expired";

export default function setLocalStorage() {
	if (urlCompare()) {
        let tokenArray = window.location.href.split('#')[1].split('&');
        let currentTime = Math.floor(new Date().getTime() / 1000);
        for (let i = 0; i < tokenArray.length; i++) {
            let tokenDictValue = tokenArray[i].split('=');
            let key = tokenDictValue[0];
            let value = key === "expires_in" ? parseInt(tokenDictValue[1]) + currentTime : tokenDictValue[1];
            if (typeof window !== "undefined" && window)
                localStorage.setItem(key, value);
        }
    }   
};