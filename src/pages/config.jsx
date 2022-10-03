import React from "react";
import { Link } from "gatsby";

import Header from "./elements/header";

import '../style/pages/config.scss';

class Config extends React.Component {

    constructor(props) {
        super(props);
        let options = JSON.parse(sessionStorage.getItem("options"))
        this.state = {
            duration_ms: options === null ? false : options.duration_ms,
            key: options === null ? false : options.key,
            mode: options === null ? false : options.mode,
            tempo: options === null ? false : options.tempo,
            acousticness: options === null ? false : options.acousticness,
            danceability: options === null ? false : options.danceability,
            energy: options === null ? false : options.energy,
            liveness: options === null ? false : options.liveness,
            loudness: options === null ? false : options.loudness,
            valence: options === null ? false : options.valence,
        }
        this.optionReset = this.optionReset.bind(this)
    }

    optionReset() {
        this.setState({
            duration_ms: false,
            key: false,
            mode: false,
            tempo: false,
            acousticness: false,
            danceability: false,
            energy: false,
            liveness: false,
            loudness: false,
            valence: false
        })
    }

    render() {
        console.log("aa")
        console.log(this.state)
        const song = JSON.parse(sessionStorage.getItem("song"))
        return (
            <main>
                <title>More Of The Same</title>

                <Header />
                
                <div id="selected-song">
                    <div id="selected-song-details">
                        <div id="selected-song-image">
                            <img className="search-result-button-img" src={song.album.images[song.album.images.length-2].url} style={{float: 'left'}} />
                        </div>
                        <div id="selected-song-name">
                            <div id="selected-song-name-title">
                                {song.name}
                            </div>
                            <div id="selected-song-name-artist">
                                {song.artists.map((el) => el.name).join(", ")}
                            </div>
                        </div>
                        {/*<div id="play-on-spotify">
                            <button onClick={() => window.open(song.external_urls.spotify, "_blank").focus()}>Play on Spotify</button>
                        </div>*/}
                    </div>
                </div>

                <div id="selected-song-options-list">
                    <div id="selected-song-options-title">
                        I want songs with a similar...
                    </div>
                    <div id="selected-song-options">
                        <label for="selected-song-option-duration_ms">
                            Duration
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({duration_ms: !this.state.duration_ms})}} value="" className="selected-song-option" id="selected-song-option-duration_ms" checked={this.state.duration_ms} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-duration">
                                    The duration of the track. If selected, you will get songs with a similar duration.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-key">
                            Key
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({key: !this.state.key})}} className="selected-song-option" id="selected-song-option-key" checked={this.state.key} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-key">
                                    The key of a song is the musical note the song's melody is centered around. If this option is selected, you will likely get songs with the same key of the selected song.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-mode">
                            Mode
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({mode: !this.state.mode})}} className="selected-song-option" id="selected-song-option-mode" checked={this.state.mode} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-mode">
                                    Songs usually are either major or minor. A song in minor mode, in general, sound darker and more serious than one in major mode. If this option is selected, you will get songs with the same mode of the selected song.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-tempo">
                            Speed
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({tempo: !this.state.tempo})}} className="selected-song-option" id="selected-song-option-tempo" checked={this.state.tempo} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-speed">
                                    How fast a song is. If this option is selected, you will get songs with the same speed.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-acousticness">
                            Acousticness
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({acousticness: !this.state.acousticness})}} className="selected-song-option" id="selected-song-option-acousticness" checked={this.state.acousticness} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-acousticness">
                                    For each song, Spotify can detect how likely it is an acoustic song, i.e. a song that features no electronic instruments (like electric guitars or synthetizers). If this option is selected, and you have selected an acoustic song, you should get a playlist of acoustic songs. The opposite is true.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-danceability">
                            Danceability
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({danceability: !this.state.danceability})}} className="selected-song-option" id="selected-song-option-danceability" checked={this.state.danceability} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-danceability">
                                    For each song, Spotify can detect how suitable a track is for dancing. If this option is selected, you will get songs with the same danceability of the track you selected.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-energy">
                            Energy
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({energy: !this.state.energy})}} className="selected-song-option" id="selected-song-option-energy" checked={this.state.energy} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-energy">
                                    For each song, Spotify detects how energetic it is. The faster, louder and noisier a song is, the more energetic it is. If this option is selected, you will get songs with the same energy of the song you selected.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-liveness">
                            Liveness
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({liveness: !this.state.liveness})}} className="selected-song-option" id="selected-song-option-liveness" checked={this.state.liveness} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-liveness">
                                    For each song, Spotify detects how likely it is to have live audience in the recording. If this option is selected, and you have selected a song recorded live, you should get a playlist of live songs. The opposite is true.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-loudness">
                            Loudness
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({loudness: !this.state.loudness})}} className="selected-song-option" id="selected-song-option-loudness" checked={this.state.loudness} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-loudness">
                                    How loud a song's recording is. If this option is selected, you will get songs that are as loud as the selected one.
                                </div>
                            </div>
                        </label>
                        <label for="selected-song-option-valence">
                            Emotion
                            <div className="checkbox-container">
                                <input type="checkbox" onChange = {() => {this.setState({valence: !this.state.valence})}} className="selected-song-option" id="selected-song-option-valence" checked={this.state.valence} />
                                <span class="slider"></span>
                            </div>
                            <div className="info-container">
                                <div className="explanation-list-text" id="explanation-emotions">
                                    For each song, Spotify detects how likely it is to convey positive emotions, i.e. they sound happy, cheerful, euphoric etc. Although this sounds similar to "Mode", it is not the same: a song can be in a minor mode and still have a positive feeling. If this option is selected, you will get songs that convey the same emotion of the song you selected.
                                </div>
                            </div>
                        </label>
                    </div>

                    <div id="playlist-button">
                        <button onClick={this.preparePlayback}>
                            <Link to={"/result"} onClick={() => {sessionStorage.setItem("options", JSON.stringify(this.state))}} style={{textDecoration: "none", color: "#4C4C7A"}}>
                                Make my playlist
                            </Link>
                        </button>
                    </div>
                    <div id="deselect-button">
                        <button onClick={this.optionReset}>
                            Deselect all
                        </button>
                    </div>
                </div>

            </main>
        )
    }

}

export default Config