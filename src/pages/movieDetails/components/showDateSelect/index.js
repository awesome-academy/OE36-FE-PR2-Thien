import React, { useMemo } from "react";
import { isEqual } from "utils/compareDate";
import { useDispatch, useSelector } from "react-redux";
import { changeShowDate } from "app/features/offer/offerSlice";
import "./style.scss";
import { changeShowLoading } from "app/features/common";
import { DAY_STRING, MONTH_STRING } from "constants/stringMap";

function ShowDateSelect() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.offer.date) || new Date();
  const toDate = useSelector((state) => state.offer.movie?.showing_to_date);

  const dateList = useMemo(() => {
    let newDateList = [];
    const beginDate = new Date();
    for (
      let date = beginDate;
      date <= new Date(Number(toDate));
      date.setDate(date.getDate() + 1)
    ) {
      newDateList.push(new Date(date));
    }
    return newDateList;
  }, [toDate]);

  const handleChangeValue = (event) => {
    dispatch(changeShowLoading(true));
    const newDate = new Date(event.target.dataset.date);
    dispatch(changeShowDate({ date: newDate }));
    setTimeout(() => {
      window.scrollTo(0, 450);
      dispatch(changeShowLoading(false));
    }, 500);
  };

  return (
    <>
      <div className="schedule">
        <ul className="date-list">
          {dateList.map((date, index) => (
            <li key={index}>
              <div
                className={`date-list__option 
                ${
                  isEqual(date, selectedDate) ? "date-list__option--active" : ""
                }`}
                data-date={date}
                onClick={handleChangeValue}
              >
                <span>{DAY_STRING[date.getDay()]}</span>
                <span>{date.getDate()}</span>
                <span>{MONTH_STRING[date.getMonth()]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ShowDateSelect;
