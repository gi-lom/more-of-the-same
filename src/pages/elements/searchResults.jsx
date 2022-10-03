import React from "react";
import { Link } from "gatsby";

import Arrow from "../../images/arrow.svg"
import Search from "../../images/search.svg"
import SearchNofound from "../../images/search-nofound.svg"

const SongList = (songs, toConfig, value) => {
    let list = songs.tracks.items
    let buttonList = []
    for (let i=0; i<list.length; i++) {
        let current = list[i]
        let artistList = current.artists.map((el) => el.name).join(", ")
        let imageSrc = current.album.images[current.album.images.length-1].url
        buttonList.push(
            <div className="search-result-container">
                <button className="search-result"><Link to={"/config"} state={{song: current}} style={{textDecoration: "none"}}>
                    <div>
                        <div className="search-result-button-img">
                            <img src={imageSrc} />
                        </div>
                        <div className="search-result-button-text">
                            <div className="search-result-button-name"> {current.name} </div>
                            <div className="search-result-button-artists"> {artistList} </div>
                        </div>
                    </div>
                </Link></button>
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
    if (songs !== null && typeof songs.tracks != "undefined") {
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
            const ShowPreviousButton = () => {
                return songs.tracks.previous === null ?
                    <div className="search-button" /> :
                    <button className="search-button" onClick={() => props.changeOffset(false)}>
                        <img src={Arrow} className="svg" style={{transform: "scale(-1,1"}} />
                    </button>
            }
            const ShowNextButton = () => {
                return songs.tracks.next === null ?
                    <div className="search-button"/> :
                    <button className="search-button" onClick={() => props.changeOffset(true)}>
                        <img className="svg" src={Arrow} />
                    </button>
            }
            const list = SongList(songs, props.toConfig, props.value)
            return (
                <div id="search-results-box">
                    <div id="search-navigate">
                        <div className="search-button-container" id="previous-button-space">
                            <ShowPreviousButton />
                        </div>
                        <div className="search-button-container" id="next-button-space">
                            <ShowNextButton />
                        </div>
                    </div>
                    {list}
                </div>
            )
        }
    }
    else return <div />
    
}

export default SearchResults