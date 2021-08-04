import apiBanner from "apis/tasks/apiBanner";
import apiMovie from "apis/tasks/apiMovie";
import { changeShowLoading } from "app/features/common";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import {
  CATEGORY_COMING_SOON,
  CATEGORY_NOW_SHOWING,
  ERROR_NOTIFICATION,
} from "utils/constant";
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
      dispatch(warning(error.message || ERROR_NOTIFICATION));
    }
  }, []);

  return (
    <>
      <Carousel data={carouselData} />
      <MoviesList
        id="now-showing"
        title="nowShowing"
        listData={nowShowing}
        category={CATEGORY_NOW_SHOWING}
      />
      <MoviesList
        id="coming-soon"
        title="comingSoon"
        listData={comingSoon}
        category={CATEGORY_COMING_SOON}
      />
    </>
  );
}

export default Home;
