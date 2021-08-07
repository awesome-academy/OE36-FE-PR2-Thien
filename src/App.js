import { changeCurrentPath } from "app/features/common";
import AdminHeader from "layouts/admin/adminHeader";
import AdminMain from "layouts/admin/adminMain";
import SeatSelect from "pages/seatSelect";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { adminRoutes, appRoutes } from "routers/routesConfig";
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
      {Object.entries(adminRoutes).map(([name, route]) => (
        <Route
          key={name}
          path={route.path}
          exact={route.exact}
          render={() => (
            <>
              <AdminHeader />
              <AdminMain />
            </>
          )}
        />
      ))}

      <Route
        path={appRoutes.seatSelect.path}
        exact={false}
        render={() => <SeatSelect />}
      />
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
