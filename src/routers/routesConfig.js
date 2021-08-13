import Cinemas from "pages/cinemas";
import Contact from "pages/contact";
import Home from "pages/home";
import Login from "pages/login";
import MovieDetails from "pages/movieDetails";
import Movies from "pages/movies";
import News from "pages/news";
import Promotions from "pages/promotions";
import TicketTypeSelect from "pages/ticketTypeSelect";
import Signup from "pages/signup";
import SeatSelect from "pages/seatSelect";
import MoviesManager from "pages/admin/moviesManager/index.js";
import Dashboard from "pages/admin/dashboard";
import AdminLogin from "pages/admin/adminLogin";
import UsersManager from "pages/admin/usersManager";
import ShowtimeManager from "pages/admin/showtimeManager";
import Payment from "pages/payment";
import FoodSelect from "pages/foodSelect";
import TicketManager from "pages/admin/ticketManager";
import Profile from "pages/profile";
import PromotionDetails from "pages/promotionDetails";

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
      component: Profile,
    },
    movieDetails: {
      path: "/movies/details/:movieId",
      basePath: "/movies/details/",
      exact: true,
      component: MovieDetails,
    },
    promotionDetails: {
      path: "/promotions/details/:movieId",
      basePath: "/promotions/details/",
      exact: true,
      component: PromotionDetails,
    },
    offer: {
      path: "/movies/offer",
      exact: true,
      component: TicketTypeSelect,
    },
    seatSelect: {
      path: "/seats",
      exact: true,
      component: SeatSelect,
    },
    foodSelect: {
      path: "/foods",
      exact: true,
      component: FoodSelect,
    },
    payment: {
      path: "/payment",
      exact: true,
      component: Payment,
    },
  },
  ADMIN_ROUTES: {
    dashboard: {
      path: "/admin/dashboard",
      exact: true,
      navbar: true,
      component: Dashboard,
    },
    users: {
      path: "/admin/users",
      exact: true,
      navbar: true,
      component: UsersManager,
    },
    movies: {
      path: "/admin/movies",
      exact: true,
      navbar: true,
      component: MoviesManager,
    },
    cinemas: {
      path: "/admin/cinemas",
      exact: true,
      navbar: true,
      component: ShowtimeManager,
    },
    tickets: {
      path: "/admin/tickets",
      exact: true,
      navbar: true,
      component: TicketManager,
    },
    home: {
      path: "/admin",
      exact: true,
      component: Dashboard,
    },

    profile: {
      path: "/admin/profile",
      exact: true,
    },
    login: {
      path: "/admin/login",
      exact: true,
      component: AdminLogin,
    },
  },
};

export const appRoutes = ROUTES_CONFIG.APP_ROUTES;
export const adminRoutes = ROUTES_CONFIG.ADMIN_ROUTES;
export default ROUTES_CONFIG;
