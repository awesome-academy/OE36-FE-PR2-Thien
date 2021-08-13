import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Button } from "devextreme-react";
import { isEqual } from "utils/compareDate";
import { useDispatch, useSelector } from "react-redux";
import { changeShowtime } from "app/features/offer/offerSlice";
import { useHistory } from "react-router-dom";
import { appRoutes } from "routers/routesConfig";
import "./style.scss";
import { changeCurrentPath } from "app/features/common";

ShowTimeOption.propTypes = {
  showtime: PropTypes.array,
  cinemaId: PropTypes.number
};

function ShowTimeOption({ showtime ,cinemaId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedDate = useSelector((state) => state.offer.date) || new Date();
  const userToken = useSelector((state) => state.account.token)
  const showTimeList = useMemo(() => {
    return showtime?.filter((showtimeItem) =>
      isEqual(new Date(showtimeItem.date), selectedDate) && showtimeItem.cinemaId === cinemaId
    );
  }, [showtime, selectedDate]);

  const handleShowTimeSelect = (showtime) => {
    dispatch(
      changeShowtime({
        showtime: showtime,
      })
    );
    if(userToken){
      history.push(appRoutes.offer.path);
    }
    else {
      dispatch(changeCurrentPath(appRoutes.offer.path))
      history.push(appRoutes.login.path);
    }
  };

  return (
    <>
      {showTimeList?.length > 0 && (
        <div className="cinema__showtime">
          <h5 className="cinema__name">{showTimeList[0].cinemaName}</h5>
          <ul className="cinema__showtime-list">
            {showTimeList?.map((showtime, index) => (
              <li key={index} className="cinema__showtime">
                {isEqual(showtime.date, selectedDate) && (
                  <Button onClick={() => handleShowTimeSelect(showtime)}>
                    {showtime.time}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ShowTimeOption;
