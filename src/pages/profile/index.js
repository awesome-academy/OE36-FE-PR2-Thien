import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import "./style.scss";
import TicketList from "./ticketList";
import UserInfo from "./userInfo";

function Profile() {
  const account = useSelector((state) => state.account);

  return (
    <div className="profile container">
      {!account.token && <Redirect to={appRoutes.login.path} />}
      <UserInfo />
      <TicketList />
    </div>
  );
}

export default Profile;
