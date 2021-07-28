import Error from "pages/error";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ROUTES_CONFIG from "routers/routesConfig";
import "./style.scss";

function Main() {
  return (
    <main className="page__main">
      <Switch>
        {ROUTES_CONFIG.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={() => <route.component/>}
          />
        ))}
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default Main;
