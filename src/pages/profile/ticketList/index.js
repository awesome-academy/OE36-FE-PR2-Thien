import React, { useEffect, useState } from "react";
import apiTicket from "apis/tasks/apiTicket";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { warning } from "react-toastify-redux";
import { useDispatch, useSelector } from "react-redux";
import { changeShowLoading } from "app/features/common";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const userId = useSelector((state) => state.account.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiTicket.get({ userId: userId }).then((response) => {
        if (response.status >= 200 && response.status < 400) {
          setTickets(response.data);
        }
        dispatch(changeShowLoading(false));
      });
    } catch (err) {
      dispatch(changeShowLoading(false));
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, []);
  return <section className="profile__tickets">{tickets.length}</section>;
}

export default TicketList;
