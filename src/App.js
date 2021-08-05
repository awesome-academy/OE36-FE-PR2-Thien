import { changeCurrentPath } from "app/features/common";
import Admin from "pages/admin";
import SeatSelect from "pages/seatSelect";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import Footer from "./layouts/footer";
import Header from "./layouts/header";
import Main from "./layouts/main";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      location.pathname !== appRoutes.login.path &&
      location.pathname !== appRoutes.signup.path
    ) {
      dispatch(changeCurrentPath(null));
    }
  }, [location]);
  return (
    <Switch>
      <Route path="/admin" exact={true} render={() => <Admin />} />
      <Route path="/seats" exact={true} render={() => <SeatSelect />} />
      <Route
        render={() => (
          <>
            <Header />
            <Main />
            <Footer />
          </>
        )}
      />
    </Switch>
  );
}

export default App;
