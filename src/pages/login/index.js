import React from "react";
import { EmailRule } from "devextreme-react/form";
import { Link, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RequiredRule } from "devextreme-react/data-grid";
import { Button, TextBox, Validator } from "devextreme-react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "app/sagas/auth/authActions";
import serializeForm from "utils/serializeForm";
import "./style.scss";
import { appRoutes } from "routers/routesConfig";
import { BASIC_USER_ROLE } from "constants/common";

function Login() {
  const { t } = useTranslation();
  const account = useSelector((state) => state.account);
  const currentPath = useSelector((state) => state.common.currentPath);
  const dispatch = useDispatch();
  const handleSubmitForm = (event) => {
    event.preventDefault();
    dispatch({
      type: authAction.LOGIN,
      payload: { ...serializeForm(event.target), role: BASIC_USER_ROLE },
    });
  };
  return (
    <section className="login">
      {account.token && <Redirect to={currentPath || appRoutes.home.path} />}
      <div className="login__content container">
        <header className="login__header">
          <h3>{currentPath ? t("loginToContinue") : t("login")}</h3>
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
              <p>
                <span>{t("Don't have an Account")} </span>
                <Link to={appRoutes.signup.path}>{t("signup")}</Link>
              </p>
              <Button text={t("login")} useSubmitBehavior={true} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
