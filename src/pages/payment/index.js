import React from "react";
import Header from "layouts/payment/header";
import Footer from "layouts/payment/footer";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appRoutes } from "routers/routesConfig";
import "./style.scss";
import { TextBox, Validator } from "devextreme-react";
import { RequiredRule } from "devextreme-react/data-grid";
import Ticket from "../../components/ticket";
import { changeMethod } from "app/features/offer/offerSlice";

function Payment() {
  const offer = useSelector((state) => state.offer);
  const dispatch = useDispatch();
  const onMethodChange = (event) => {
    dispatch(changeMethod(event.target.value));
  }
  return (
    <section className="payment-step">
      {!offer.showtime && <Redirect to={appRoutes.movies.path} />}
      <Header />
      <main className="payment-step__main container">
        <div className="payment-step__method payment-step__option">
          <h2>Choose your payment</h2>
          <div className="cash-payment">
            <input
              type="radio"
              id="cash"
              name="method"
              value="cash"
              hidden
              onChange={onMethodChange}
            />
            <label htmlFor="cash">
              <span>
                <i className="fa fa-money" aria-hidden="true"></i>
                Payment in cash
              </span>
            </label>
          </div>
          <div className="credit-payment">
            <input
              type="radio"
              id="credit-card"
              name="method"
              value="credit-card"
              hidden
              onChange={onMethodChange}
            />
            <label htmlFor="credit-card">
              <span>
                <i className="fa fa-credit-card" aria-hidden="true"></i>Add
                Debit/Credit Card
              </span>
              <div className="credit-card__form">
                <form onSubmit={() => {}}>
                  <div className="fieldset">
                    <div className="input-field">
                      <TextBox name="cardNumber" placeholder="CardNumber">
                        <Validator>
                          <RequiredRule />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="input-field">
                      <TextBox name="expDate" placeholder="MM/YY">
                        <Validator>
                          <RequiredRule />
                        </Validator>
                      </TextBox>
                      <TextBox name="cvv" placeholder="CVV">
                        <Validator>
                          <RequiredRule />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="input-field">
                      <TextBox name="name" placeholder="Name">
                        <Validator>
                          <RequiredRule />
                        </Validator>
                      </TextBox>
                    </div>
                  </div>
                </form>
              </div>
            </label>
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

export default Payment;
