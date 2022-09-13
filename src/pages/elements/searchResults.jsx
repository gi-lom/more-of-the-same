import React from "react";
import { Link } from "gatsby";

const SongList = (songs, toConfig, value) => {
    let list = songs.tracks.items
    let buttonList = []
    for (let i=0; i<list.length; i++) {
        let current = list[i]
        let artistList = current.artists.map((el) => el.name).join(", ")
        buttonList.push(
            <button><Link to={"/config"} state={{song: current}}>
                <div className="search-result" style={{display: 'inline-block', width: '100%'}}>
                    <img className="search-result-button-img" src={current.album.images[current.album.images.length-1].url} style={{float: 'left'}} />
                    <div className="search-result-button-name"> {current.name} </div>
                    <div className="search-result-button-artists"> {artistList} </div>
                </div>
            </Link></button>
        )
    }
    return (
        <div>
            {buttonList}
        </div>
    )
}

const SearchResults = (props) => {
    const songs = props.songs
    if (songs !== null && typeof songs.tracks != "undefined") {
        const ShowPreviousButton = () => {
            return songs.tracks.previous === null ?
                <div /> :
                <button className="search-navigate" id="search-previous" onClick={() => props.changeOffset(false)}>Previous</button>
        }
        const ShowNextButton = () => {
            return songs.tracks.next === null ?
                <div /> :
                <button className="search-navigate" id="search-next" onClick={() => props.changeOffset(true)}>Next</button>
        }
        const list = SongList(songs, props.toConfig, props.value)
        return (
            <div id="search-results-box">
                <ShowPreviousButton />
                {list}
                <ShowNextButton />
            </div>
        )
    }
    else return <div />
    
}

export default SearchResults