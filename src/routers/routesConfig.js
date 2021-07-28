import Cinemas from "pages/cinemas";
import Contact from "pages/contact";
import Home from "pages/home";
import Movies from "pages/movies";
import News from "pages/news";
import Promotions from "pages/promotions";

const ROUTES_CONFIG = [
  {
    path: "/home",
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: "/movies",
    name: "movies",
    exact: true,
    component: Movies,
  },
  {
    path: "/cinemas",
    name: "cinemas",
    exact: true,
    component: Cinemas,
  },
  {
    path: "/news",
    name: "news",
    exact: true,
    component: News,
  },
  {
    path: "/promotions",
    name: "promotions",
    exact: true,
    component: Promotions,
  },
  {
    path: "/contact",
    name: "contact",
    exact: true,
    component: Contact,
  },
];

export default ROUTES_CONFIG;
