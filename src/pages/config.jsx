import React from "react";

import retrievePlaylist from "../modules/retrieve-playlist";
import getDevices from "../modules/devices";
import getSongToPlay from "../modules/song-play"
import handleError from "../modules/error";

import Popup from "./elements/popup";
import Footer from "./elements/header";

class Config extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
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
            },
            popup: false,
            songs: "",
            devices: []
        }
        this.preparePlayback = this.preparePlayback.bind(this)
        this.prepareDevice = this.prepareDevice.bind(this)
    }

    preparePlayback() {
        retrievePlaylist(this.props.location.state.song, this.props.location.state.options, this.state.options)
        .then((playlist) => {
            if ('error' in playlist)
                handleError()
            else {
                if (playlist === null || playlist.tracks.length === 0) {
                    window.alert("Spotify did not find any songs to recommend. This usually happens with songs that haven't been listened to enough worldwide. You'll be now redirected to the search page.")
                    window.location.replace("/search")
                }
                else {
                    getDevices().then((resp) => {
                        if ('error' in playlist)
                            handleError()
                        else {
                            this.setState({devices: resp.devices})
                            this.setState({songs: JSON.stringify(playlist.tracks.map(song => song.uri))})
                            this.state.popup = true
                        }
                    })
                }
            }
        })
    }

    prepareDevice(deviceId) {
        getSongToPlay(this.state.songs, deviceId)
        .then((resp) => {
            if ('error' in resp) {
                if (resp.error == 502)
                    window.alert("Couldn't open it. Did you recently close this session?")
                else
                    handleError()
            }
        })
    }

    render() {
        const song = this.props.location.state.song
        const popup = this.state.popup ? <Popup devices={this.state.devices} prepareDevice={this.prepareDevice}/> : <div />
        return (
            <main>
                <title>More Of The Same</title>
                
                <div id="selected-song-image">
                    <img className="search-result-button-img" src={song.album.images[song.album.images.length-2].url} style={{float: 'left'}} />
                </div>
                <div id="selected-song-name">
                    {song.name} by {song.artists.map((el) => el.name).join(", ")}
                </div>

                <div id="selected-song-options">
                    I want songs with a similar...
                    <label for="selected-song-option-duration_ms">
                    <input type="checkbox" onChange = {() => {this.setState({duration_ms: !this.state.duration_ms})}} value="" className="selected-song-option" id="selected-song-option-duration_ms" />
                    Duration
                    </label>
                    <label for="selected-song-option-key">
                        <input type="checkbox" onChange = {() => {this.setState({key: !this.state.key})}} className="selected-song-option" id="selected-song-option-key" />
                        Key
                    </label>
                    <label for="selected-song-option-mode">
                        <input type="checkbox" onChange = {() => {this.setState({mode: !this.state.mode})}} className="selected-song-option" id="selected-song-option-mode" />
                        Mode
                    </label>
                    <label for="selected-song-option-tempo">
                        <input type="checkbox" onChange = {() => {this.setState({tempo: !this.state.tempo})}} className="selected-song-option" id="selected-song-option-tempo" />
                        Speed
                    </label>
                    <label for="selected-song-option-acousticness">
                        <input type="checkbox" onChange = {() => {this.setState({acousticness: !this.state.acousticness})}} className="selected-song-option" id="selected-song-option-acousticness" />
                        Acousticness
                    </label>
                    <label for="selected-song-option-danceability">
                        <input type="checkbox" onChange = {() => {this.setState({danceability: !this.state.danceability})}} className="selected-song-option" id="selected-song-option-danceability" />
                        Danceability
                    </label>
                    <label for="selected-song-option-energy">
                        <input type="checkbox" onChange = {() => {this.setState({energy: !this.state.energy})}} className="selected-song-option" id="selected-song-option-energy" />
                        Energy
                    </label>
                    <label for="selected-song-option-liveness">
                        <input type="checkbox" onChange = {() => {this.setState({liveness: !this.state.liveness})}} className="selected-song-option" id="selected-song-option-liveness" />
                        Liveness
                    </label>
                    <label for="selected-song-option-loudness">
                        <input type="checkbox" onChange = {() => {this.setState({loudness: !this.state.loudness})}} className="selected-song-option" id="selected-song-option-loudness" />
                        Loudness
                    </label>
                    <label for="selected-song-option-valence">
                        <input type="checkbox" onChange = {() => {this.setState({valence: !this.state.valence})}} className="selected-song-option" id="selected-song-option-valence" />
                        Emotions
                    </label>

                    <button onClick={this.preparePlayback}>
                        {/*<Link to={"/result"} state={{song: song, options: this.state}}>*/}
                            MAKE MY PLAYLIST
                        {/*</Link>*/}
                    </button>
                </div>

                {popup}

                <div id="explanation">
                    <div id="explanation-title"> WHAT DO THESE OPTIONS MEAN? </div>
                    <div id="explanation-list">
                        <ul>
                            <li>
                                <div className="explanation-list-title">Duration: </div>
                                <div className="explanation-list-text">
                                    The duration of the track. If selected, you will get songs with a similar duration.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Key: </div>
                                <div className="explanation-list-text">
                                    The key of a song is the musical note the song's melody is centered around. If this option is selected, you will likely get songs with the same key of the selected song.
                                    </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Mode: </div>
                                <div className="explanation-list-text">
                                    Songs usually are either major or minor. A song in minor mode, in general, sound darker and more serious than one in major mode. If this option is selected, you will get songs with the same mode of the selected song.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Speed: </div>
                                <div className="explanation-list-text">
                                    How fast a song is. If this option is selected, you will get songs with the same speed.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Acousticness: </div>
                                <div className="explanation-list-text">
                                    For each song, Spotify can detect how likely it is an acoustic song, i.e. a song that features no electronic instruments (like electric guitars or synthetizers). If this option is selected, and you have selected an acoustic song, you should get a playlist of acoustic songs. The opposite is true.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Danceability: </div>
                                <div className="explanation-list-text">
                                    For each song, Spotify can detect how suitable a track is for dancing. If this option is selected, you will get songs with the same danceability of the track you selected.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Energy: </div>
                                <div className="explanation-list-text">
                                    For each song, Spotify detects how energetic it is. The faster, louder and noisier a song is, the more energetic it is. If this option is selected, you will get songs with the same energy of the song you selected.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Liveness: </div>
                                <div className="explanation-list-text">
                                    For each song, Spotify detects how likely it is to have live audience in the recording. If this option is selected, and you have selected a song recorded live, you should get a playlist of live songs. The opposite is true.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Loudness: </div>
                                <div className="explanation-list-text">
                                    How loud a song's recording is. If this option is selected, you will get songs that are as loud as the selected one.
                                </div>
                            </li>
                            <li>
                                <div className="explanation-list-title">Emotions: </div>
                                    For each song, Spotify detects how likely it is to convey positive emotions, i.e. they sound happy, cheerful, euphoric etc. Although this sounds similar to "Mode", it is not the same: a song can be in a minor mode and still have a positive feeling. If this option is selected, you will get songs that convey the same emotion of the song you selected.
                                <div className="explanation-list-text">
                                        
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <Footer />

            </main>
        )
    }

}

export default Config