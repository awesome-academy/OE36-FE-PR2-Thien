import { ADMIN_ROLE } from "constants/common";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { adminRoutes } from "routers/routesConfig";

function Dashboard() {
  const account = useSelector((state) => state.account);
  return (
    <div>
      {(!account.token || account.role !== ADMIN_ROLE) && (
        <Redirect to={adminRoutes.login.path} />
      )}
    </div>
  );
}

export default Dashboard;
