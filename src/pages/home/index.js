import apiBanner from "apis/tasks/apiBanner";
import apiMovie from "apis/tasks/apiMovie";
import { changeShowLoading } from "app/features/common";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Carousel from "./components/carousel";
import MoviesList from "./components/movies";

function Home() {
  const [carouselData, setCarouselData] = useState([]);
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(changeShowLoading(true));
      Promise.all([
        apiBanner.get(),
        apiMovie.getNowShowingMovies(),
        apiMovie.getComingSoonMovies(),
      ]).then(([carousel, nowShowing, comingSoon]) => {
        dispatch(changeShowLoading(false));
        setCarouselData(carousel.data);
        setNowShowing(nowShowing.data);
        setComingSoon(comingSoon.data);
      });
    } catch (error) {
      console.log(error);
    }
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
