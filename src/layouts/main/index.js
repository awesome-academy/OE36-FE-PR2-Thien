import LoadingOverlay from "components/loadingOverlay";
import Error from "pages/error";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ROUTES_CONFIG from "routers/routesConfig";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify-redux";
import CustomToast from "components/customToast";
import Home from "pages/home";

function Main() {
  const commonSetting = useSelector((state) => state.common);
  return (
    <main className="page__main">
      {commonSetting.showLoading && <LoadingOverlay />}
      <Switch>
        {ROUTES_CONFIG.APP_ROUTES.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={() => <route.component />}
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
