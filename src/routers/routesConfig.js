import Cinemas from "pages/cinemas";
import Contact from "pages/contact";
import Home from "pages/home";
import Login from "pages/login";
import Movies from "pages/movies";
import News from "pages/news";
import Promotions from "pages/promotions";
import Signup from "pages/signup";

const ROUTES_CONFIG = {
  APP_ROUTES: [
    {
      path: "/home",
      name: "home",
      exact: true,
      navbar: true,
      component: Home,
    },
    {
      path: "/movies",
      name: "movies",
      exact: true,
      navbar: true,
      component: Movies,
    },
    {
      path: "/cinemas",
      name: "cinemas",
      exact: true,
      navbar: true,
      component: Cinemas,
    },
    {
      path: "/news",
      name: "news",
      exact: true,
      navbar: true,
      component: News,
    },
    {
      path: "/promotions",
      name: "promotions",
      exact: true,
      navbar: true,
      component: Promotions,
    },
    {
      path: "/contact",
      name: "contact",
      exact: true,
      navbar: true,
      component: Contact,
    },
    {
      path: "/login",
      name: "login",
      exact: true,
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      exact: true,
      component: Signup,
    },
  ],
  ADMIN_ROUTES: [],
};

export default ROUTES_CONFIG;
