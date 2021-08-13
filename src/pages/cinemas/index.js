import apiCinema from "apis/tasks/apiCinema";
import { changeShowLoading } from "app/features/common";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import { Button } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import formatMoney from "utils/formatMoney";
import "./style.scss";

function Cinemas() {
  const [cinemas, setCinemas] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiCinema.get().then((response) => {
        if (response.status === 200) {
          setCinemas(response.data);
        }
        dispatch(changeShowLoading(false));
      });
    } catch (err) {
      dispatch(changeShowLoading(false));
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, []);
  return (
    <div className="cinemas-page container">
      <ul>
        {cinemas?.map((cinema, index) => (
          <li key={index}>
            <div className="cinema-item">
              <div className="cinema__image">
                <img src={cinema.imgSrc} alt={cinema.name} />
              </div>
              <div className="cinema__info-wrap">
                <div className="cinema__info">
                  <h3 className="info__content">
                    <span className="info__name">{cinema.name}</span> │
                    <span className="info__ticket-price">
                      {formatMoney(cinema.regularTicketPrice)} VND
                    </span>{" "}
                    │
                    <span className="info__ticket-price">
                      {formatMoney(cinema.VIPTicketPrice)} VND
                    </span>
                  </h3>

                  <div className="info__description">
                    <p>{cinema.description}</p>
                  </div>
                </div>
                <a target="_blank" rel="noreferrer" href={cinema.direction}>
                  <Button text="Direction" />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cinemas;
