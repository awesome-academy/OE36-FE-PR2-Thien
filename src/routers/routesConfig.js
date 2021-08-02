import Cinemas from "pages/cinemas";
import Contact from "pages/contact";
import Home from "pages/home";
import Login from "pages/login";
import Movies from "pages/movies";
import News from "pages/news";
import Promotions from "pages/promotions";
import Signup from "pages/signup";

const ROUTES_CONFIG = {
  APP_ROUTES: {
    home: {
      path: "/home",
      exact: true,
      navbar: true,
      component: Home,
    },
    movies: {
      path: "/movies",
      exact: true,
      navbar: true,
      component: Movies,
    },
    cinemas: {
      path: "/cinemas",
      exact: true,
      navbar: true,
      component: Cinemas,
    },
    news: {
      path: "/news",
      exact: true,
      navbar: true,
      component: News,
    },
    promotions: {
      path: "/promotions",
      exact: true,
      navbar: true,
      component: Promotions,
    },
    contact: {
      path: "/contact",
      exact: true,
      navbar: true,
      component: Contact,
    },
    login: {
      path: "/login",
      exact: true,
      component: Login,
    },
    signup: {
      path: "/signup",
      exact: true,
      component: Signup,
    },
    profile: {
      path: "/profile",
      exact: true,
    },
  },
  ADMIN_ROUTES: [],
};

export const appRoutes = ROUTES_CONFIG.APP_ROUTES;
export const adminRoutes = ROUTES_CONFIG.ADMIN_ROUTES;
export default ROUTES_CONFIG;
