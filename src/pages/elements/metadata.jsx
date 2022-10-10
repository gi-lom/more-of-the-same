import React from "react";
import { Helmet } from "react-helmet";

const Metadata = (props) => {
  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>More Of The Same</title>
      {props.robots == "nofollow" &&
        <link rel="canonical" href="https://moreofthesame.gatsbyjs.io" />
      }
      <meta charset="utf-8" />
      <meta
        name="description"
        content="Spotify tool to get songs that sound like one of your choice"
      />
      <meta
        name="keywords"
        content="spotify, music, playlist, playlist generator, spotify app"
      />
      <meta name="author" content="gi-lom" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={props.robots} />
    </Helmet>
  );
};

export default Metadata;
