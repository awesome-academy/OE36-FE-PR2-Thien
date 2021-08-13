import React, { useEffect, useState } from "react";
import apiTicket from "apis/tasks/apiTicket";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { warning } from "react-toastify-redux";
import { useDispatch, useSelector } from "react-redux";
import { changeShowLoading } from "app/features/common";
import TicketItem from "../ticketItem";
import "./style.scss";

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
  return (
    <section className="profile__tickets">
      <h2 className="content__title">Your tickets</h2>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <TicketItem ticket={ticket} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TicketList;
