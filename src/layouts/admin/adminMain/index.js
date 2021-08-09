import CustomToast from "components/customToast";
import Error from "pages/error";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify-redux";
import { adminRoutes } from "routers/routesConfig";
import AdminSidebar from "../adminSideBar";
import "./style.scss";

function AdminMain() {
  return (
    <main className="admin-main">
      <Switch>
        <Route
          path={adminRoutes.home.path}
          exact={adminRoutes.home.exact}
          render={() => <Redirect to={adminRoutes.dashboard.path} />}
        />
        {Object.entries(adminRoutes).map(([name, route]) => (
          <Route
            key={name}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <>
                {route.path !== adminRoutes.login.path && <AdminSidebar />}
                <route.component {...props} />
              </>
            )}
          />
        ))}
        <Route component={Error} />
      </Switch>
      <ToastContainer toastComponent={CustomToast} />
    </main>
  );
}

export default AdminMain;
