import React from "react";
import { motion } from "framer-motion";
import { TransitionState } from "gatsby-plugin-transition-link";

import setLocalStorage from "../modules/storage";
import songSearch from "../modules/song-search";
import handleError from "../modules/error";

import Metadata from "./elements/metadata.jsx";
import SearchResults from "./elements/searchResults";
import Header from "./elements/header";

import "../style/pages/search.scss";

import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      offset: 0,
      search:
        typeof window === "undefined" ||
        !window ||
        sessionStorage.getItem("search") === null
          ? null
          : JSON.parse(sessionStorage.getItem("search")),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeOffset = this.changeOffset.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    setLocalStorage();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  handleSubmit() {
    this.setState({ offset: 0 });
    this.getSongs();
  }

  handleKeyDown(e) {
    if (e.key === "Enter") this.handleSubmit();
  }

  changeOffset(isNext) {
    let newOffset = isNext ? this.state.offset + 10 : this.state.offset - 10;
    this.state.offset = newOffset;
    this.getSongs();
  }

  getSongs() {
    if (this.state.value !== "") {
      songSearch(this.state.value, this.state.offset).then((songs) => {
        if (songs !== null) {
          if ("error" in songs) handleError();
          this.setState({ search: songs });
          if (typeof window !== "undefined" && window)
            sessionStorage.setItem("search", JSON.stringify(songs));
        }
      });
    }
  }

  render() {
    // let SearchResults = typeof window === "undefined" || !window || this.state.search == [] ? <div /> : <SearchResults songs={this.state.search} value={this.state.value} changeOffset={this.changeOffset} toConfig={this.toConfig} />

    if (typeof window !== "undefined" && window)
      window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    
    return (
      <main>
        <Metadata props={"none"} />

        <Header />

        <TransitionState>
          {({ transitionStatus, entry, exit }) => (
            <motion.div
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                ease: "easeOut",
              }}
              animate={
                transitionStatus === "exiting"
                  ? { opacity: 0, x: 0, y: 0 }
                  : { opacity: 1, x: 0, y: 0 }
              }
              transition={
                transitionStatus === "exiting"
                  ? { duration: 1 }
                  : { duration: 1 }
              }
            >
              <div id="search">
                <div id="search-bar">
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    placeholder="Type a song, an artist, or an album's name"
                  />
                </div>

                <SearchResults
                  songs={this.state.search}
                  value={this.state.value}
                  changeOffset={this.changeOffset}
                  toConfig={this.toConfig}
                  transitionStatus={transitionStatus}
                  entry={entry}
                  exit={exit}
                />
              </div>
            </motion.div>
          )}
        </TransitionState>
      </main>
    );
  }
}

export default Search;
