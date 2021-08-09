import { logout } from "app/features/account/accountSlice";
import { ADMIN_ROLE } from "constants/common";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminRoutes } from "routers/routesConfig";

function Dashboard() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!account.token || account.role !== ADMIN_ROLE) {
      dispatch(logout());
      history.push(adminRoutes.login.path);
    }
  }, []);
  return <div></div>;
}

export default Dashboard;
