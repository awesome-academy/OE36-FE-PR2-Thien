import apiBanner from "apis/tasks/apiBanner";
import apiMovie from "apis/tasks/apiMovie";
import React, { useEffect, useState } from "react";
import Carousel from "./components/carousel";
import MoviesList from "./components/movies";

function Home() {
  const [carouselData, setCarouselData] = useState([]);
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  
  useEffect(() => {
    apiBanner.get().then((response) => {
      setCarouselData(response.data);
    });

    apiMovie.getNowShowingMovies().then((response) => {
      setNowShowing(response.data);
    });

    apiMovie.getComingSoonMovies().then((response) => {
      setComingSoon(response.data);
    });
  }, []);

  return (
    <>
      <Carousel data={carouselData} />
      <MoviesList id="now-showing" title="nowShowing" listData={nowShowing} />
      <MoviesList id="coming-soon" title="comingSoon" listData={comingSoon} />
    </>
  );
}

export default Home;
