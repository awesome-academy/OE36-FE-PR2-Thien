import apiFood from "apis/tasks/apiFood";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import Footer from "layouts/payment/footer";
import Header from "layouts/payment/header";
import Ticket from "components/ticket";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { warning } from "react-toastify-redux";
import { appRoutes } from "routers/routesConfig";
import FoodItem from "./foodItem";
import "./style.scss";

function FoodSelect() {
  const [foods, setFood] = useState([]);
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.offer);
  useEffect(() => {
    try {
      apiFood.get().then((response) => setFood(response.data));
    } catch (err) {
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, []);

  return (
    <section className="foods payment-step">
      {!offer.showtime && <Redirect to={appRoutes.movies.path} />}
      <Header />
      <main className="payment-step__main container">
        <div className="retail">
          <h2>Retail</h2>
          <div className="food-list">
            <ul>
              {foods.map((food, index) => (
                <li key={index}>
                  <FoodItem food={food}/>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="payment-step__ticket-summary">
          <Ticket />
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default FoodSelect;
