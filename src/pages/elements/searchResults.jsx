import React from "react";
import { Link } from "gatsby";

import SearchNofound from "../../images/search-nofound.svg"

const SongList = (songs) => {
    let list = songs.tracks.items
    let buttonList = []
    for (let i=0; i<list.length; i++) {
        let current = list[i]
        let artistList = current.artists.map((el) => el.name).join(", ")
        let imageSrc = current.album.images[current.album.images.length-1].url
        buttonList.push(
            <div className="search-result-container">
                <button className="search-result">
                    <Link to={"/config"} onClick={() => sessionStorage.setItem("song",JSON.stringify(current))} style={{textDecoration: "none", color: "#4C4C7A"}}>
                        <div>
                            <div className="search-result-button-img">
                                <img src={imageSrc} />
                            </div>
                            <div className="search-result-button-text">
                                <div className="search-result-button-name"> {current.name} </div>
                                <div className="search-result-button-artists"> {artistList} </div>
                            </div>
                        </div>
                    </Link>
                </button>
                <button className="play-on-spotify" onClick={() => window.open(current.external_urls.spotify, "_blank").focus()}>Play on Spotify</button>
            </div>
        )
    }
    return (
        <div id="search-results">
            {buttonList}
        </div>
    )
}

const SearchResults = (props) => {
    const songs = props.songs
    if (typeof window !== "undefined" && window ) {
        if (songs !== undefined && songs !== null) {
            if (songs.tracks.items.length == 0)
                return (
                    <>
                        <div className="generic-search-background">
                            <img src={SearchNofound} />
                            <div className="generic-search-title">
                                Nothing found
                            </div>
                        </div>
                    </>
                )
            else {
                const list = SongList(songs)
                return (
                    <div id="search-results-box">
                        {list}
                    </div>
                )
            }
        }
        else return <div />
    }
    else return <div />
    
}

export default SearchResults