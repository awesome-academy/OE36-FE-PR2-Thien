import LoadingOverlay from "components/loadingOverlay";
import Error from "pages/error";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify-redux";
import CustomToast from "components/customToast";
import Home from "pages/home";
import VideoOverlay from "components/videoOverlay";

function Main() {
  return (
    <main className="page__main">
      <VideoOverlay />
      <LoadingOverlay />
      <Switch>
        {Object.entries(appRoutes).map(([name, route]) => (
          <Route
            key={name}
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} />}
          />
        ))}
        <Route path="/" render={() => <Home />} />
        <Route component={Error} />
      </Switch>
      <ToastContainer toastComponent={CustomToast} />
    </main>
  );
}

export default Main;
