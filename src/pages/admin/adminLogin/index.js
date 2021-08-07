import { authAction } from "app/sagas/auth/authActions";
import { ADMIN_ROLE } from "constants/common";
import { Button, TextBox, Validator } from "devextreme-react";
import { EmailRule, RequiredRule } from "devextreme-react/data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { adminRoutes } from "routers/routesConfig";
import serializeForm from "utils/serializeForm";
import "./style.scss";

function AdminLogin() {
  const { t } = useTranslation();
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const handleSubmitForm = (event) => {
    event.preventDefault();
    dispatch({
      type: authAction.LOGIN,
      payload: { ...serializeForm(event.target), role: ADMIN_ROLE },
    });
  };
  return (
    <section className="admin-login">
      {account.token && <Redirect to={adminRoutes.home.path} />}
      <div className="login__content container">
        <header className="login__header">
          <h3>{t("login")}</h3>
        </header>
        <div className="login__form">
          <form onSubmit={handleSubmitForm}>
            <div className="input-field">
              <label>
                {t("email")}
                <span>*</span>
                <TextBox name="email">
                  <Validator>
                    <RequiredRule
                      message={`${t("email")} ${t("isRequired")}`}
                    />
                    <EmailRule message={`${t("email")} ${t("isInvalid")}`} />
                  </Validator>
                </TextBox>
              </label>
            </div>
            <div className="input-field">
              <label>
                {t("password")}
                <span>*</span>
                <TextBox name="password" mode="password">
                  <Validator>
                    <RequiredRule
                      message={`${t("password")} ${t("isRequired")}`}
                    />
                  </Validator>
                </TextBox>
              </label>
            </div>
            <div className="form__action">
              <Button text={t("login")} useSubmitBehavior={true} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
