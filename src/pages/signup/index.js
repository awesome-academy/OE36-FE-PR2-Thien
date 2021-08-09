import React, { useRef, useState } from "react";
import { Button, DateBox, TextBox, Validator } from "devextreme-react";
import {
  EmailRule,
  PatternRule,
  RangeRule,
  RequiredRule,
  StringLengthRule,
} from "devextreme-react/form";
import { useTranslation } from "react-i18next";
import defaultAvatar from "assets/images/default-avatar.png";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "app/sagas/auth/authActions";
import "./style.scss";
import serializeForm from "utils/serializeForm";
import { PHONE_NUMBER_REGEX, VIETNAMESE_NAME_REGEX } from "constants/regex";
import { appRoutes } from "routers/routesConfig";

function Signup() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const selectedImage = useRef();
  const currentPath = useSelector((state) => state.common.currentPath);
  const account = useSelector((state) => state.account);
  const [avatar, setAvatar] = useState();
  const maxDate = new Date().setFullYear(new Date().getFullYear() - 12);
  const backToLogin = () => {
    history.goBack();
  };

  const addAvatar = (event) => {
    const image = event.target.files[0];
    setAvatar(URL.createObjectURL(image));
  };

  const deleteAvatar = () => {
    selectedImage.current.value = null;
    setAvatar(defaultAvatar);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    dispatch({
      type: authAction.SIGNUP,
      payload: serializeForm(event.target),
    });
  };

  return (
    <section className="signup container">
      {account.token && <Redirect to={currentPath || appRoutes.home.path} />}
      <header className="signup__header">
        <h3>{t("signup")}</h3>
      </header>
      <div className="signup__form">
        <form onSubmit={handleSubmitForm}>
          <div className="fieldset">
            <h4 className="fieldset__header">{t("credentials")}</h4>
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
          </div>
          <div className="fieldset">
            <h4 className="fieldset__header">{t("personalData")}</h4>
            <div className="input-field">
              <label>
                {t("name")}
                <span>*</span>
                <TextBox name="name">
                  <Validator>
                    <RequiredRule message={`${t("name")} ${t("isRequired")}`} />
                    <PatternRule
                      pattern={VIETNAMESE_NAME_REGEX}
                      message={`${t("name")} ${t("isInvalid")}`}
                    />
                    <StringLengthRule
                      message={`${t("name")} ${t("rangeInvalid")} 2 ${t(
                        "symbols"
                      )}`}
                      min={2}
                    />
                  </Validator>
                </TextBox>
              </label>
            </div>
            <div className="input-field">
              <label>
                {t("dateOfBirth")}
                <span>*</span>
                <DateBox
                  name="dateOfBirth"
                  displayFormat="dd/MM/yyyy"
                  invalidDateMessage={`${t("dateOfBirth")} ${t("isInvalid")}`}
                  placeholder="dd/MM/yyyy"
                >
                  <Validator>
                    <RequiredRule
                      message={`${t("dateOfBirth")} ${t("isRequired")}`}
                    />
                    <RangeRule
                      max={maxDate}
                      message={`${t("you")} ${t("rangeInvalid")} 12 ${t(
                        "age"
                      )}`}
                    />
                  </Validator>
                </DateBox>
              </label>
            </div>
            <div className="input-field">
              <label>
                {t("address")}
                <TextBox name="address"></TextBox>
              </label>
            </div>
            <div className="input-field">
              <label>
                {t("phone")}
                <TextBox name="phone">
                  <Validator>
                    <PatternRule
                      message={`${t("phone")} ${t("isInvalid")}`}
                      pattern={PHONE_NUMBER_REGEX}
                    />
                  </Validator>
                </TextBox>
              </label>
            </div>
            <div className="input-field avatar">
              <div className="fileuploader-container">
                <label>
                  <Button
                    text={avatar ? t("changeAvatar") : t("selectAvatar")}
                    onClick={() => {}}
                  ></Button>
                  <input
                    type="file"
                    id="img"
                    name="avatar"
                    accept="image/*"
                    onChange={addAvatar}
                    ref={selectedImage}
                    hidden
                  ></input>
                </label>
                {avatar && (
                  <Button
                    text={t("deleteAvatar")}
                    onClick={deleteAvatar}
                  ></Button>
                )}
              </div>
              <div className="avatar__preview">
                <img
                  src={selectedImage.current?.files[0] ? avatar : defaultAvatar}
                />
              </div>
            </div>
          </div>
          <div className="form-action">
            <Button text={t("signup")} useSubmitBehavior={true} />
            <Button text={t("backToLogin")} onClick={backToLogin} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
