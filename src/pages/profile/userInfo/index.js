import { IMAGE_COLLECTION } from "constants/collections";
import { BASE_URL } from "constants/common";
import { PHONE_NUMBER_REGEX } from "constants/regex";
import { Button, DateBox, TextBox, Validator } from "devextreme-react";
import {
  EmailRule,
  PatternRule,
  RangeRule,
  RequiredRule,
} from "devextreme-react/data-grid";
import defaultAvatar from "assets/images/default-avatar.png";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import serializeForm from "utils/serializeForm";
import { authAction } from "app/sagas/auth/authActions";

function UserInfo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const imageSelector = useRef();
  const account = useSelector((state) => state.account);
  const maxDate = new Date().setFullYear(new Date().getFullYear() - 12);
  const [disable, setDisable] = useState(true);
  const [avatar, setAvatar] = useState(
    account.avatar
      ? `${BASE_URL}/${IMAGE_COLLECTION}/${account.avatar}`
      : defaultAvatar
  );
  const changeAvatar = (event) => {
    const image = event.target.files[0];
    setAvatar(URL.createObjectURL(image));
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    setDisable(true);
    if (!imageSelector.current.value) {
      dispatch({
        type: authAction.UPDATE,
        payload: { ...serializeForm(event.target), avatar: account.avatar },
      });
    } else {
      dispatch({
        type: authAction.UPDATE,
        payload: serializeForm(event.target),
      });
    }
  };

  return (
    <section className="profile__content">
      {disable && (
        <div className="profile-mask">
          <Button onClick={() => setDisable(false)}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </Button>
        </div>
      )}
      <form onSubmit={handleSubmitForm}>
        <h2 className="content__title">Profile</h2>
        <div className="content__personal-info">
          <input name="role" value={account.role} hidden readOnly />
          <input name="id" value={account.id} hidden readOnly />
          <input name="status" value={account.status} hidden readOnly />
          <div className="avatar-wrap">
            <label>
              <img src={avatar} alt={account.name} width="100" height="100" />
              <input
                type="file"
                id="img"
                ref={imageSelector}
                name="avatar"
                accept="image/*"
                onChange={changeAvatar}
                hidden
              ></input>
            </label>
          </div>
          <div className="personal-data">
            <div className="personal-data__name">
              <TextBox name="name" defaultValue={account.name}>
                <RequiredRule message={`${t("name")} ${t("isRequired")}`} />
              </TextBox>
            </div>
            <div className="personal-data__dob">
              <DateBox
                name="dateOfBirth"
                displayFormat="dd/MM/yyyy"
                invalidDateMessage={`${t("dateOfBirth")} ${t("isInvalid")}`}
                placeholder="dd/MM/yyyy"
                defaultValue={new Date(account.dateOfBirth)}
              >
                <Validator>
                  <RequiredRule
                    message={`${t("dateOfBirth")} ${t("isRequired")}`}
                  />
                  <RangeRule
                    max={maxDate}
                    message={`${t("you")} ${t("rangeInvalid")} 12 ${t("age")}`}
                  />
                </Validator>
              </DateBox>
            </div>
          </div>
        </div>
        <div className="account-info">
          <div className="input-field">
            <label>
              <span>{t("email")}</span>
              <TextBox name="email" defaultValue={account.email}>
                <Validator>
                  <RequiredRule message={`${t("email")} ${t("isRequired")}`} />
                  <EmailRule message={`${t("email")} ${t("isInvalid")}`} />
                </Validator>
              </TextBox>
            </label>
          </div>
          <div className="input-field">
            <label>
              <span>{t("address")}</span>
              <TextBox name="address" defaultValue={account.address}></TextBox>
            </label>
          </div>
          <div className="input-field">
            <label>
              <span>{t("phone")}</span>
              <TextBox name="phone" defaultValue={account.phoneNumber}>
                <Validator>
                  <PatternRule
                    message={`${t("phone")} ${t("isInvalid")}`}
                    pattern={PHONE_NUMBER_REGEX}
                  />
                </Validator>
              </TextBox>
            </label>
          </div>
          {!disable && (
            <div className="input-field">
              <label>
                <span>{t("New password")}</span>
                <TextBox name="password" mode="password" defaultValue="">
                  <Validator>
                    <RequiredRule
                      message={`${t("password")} ${t("isRequired")}`}
                    />
                  </Validator>
                </TextBox>
              </label>
            </div>
          )}
        </div>
        {!disable && (
          <div className="form-action">
            <Button text={t("Submit")} useSubmitBehavior={true} />
            <Button text={t("Cancel")} onClick={() => setDisable(true)} />
          </div>
        )}
      </form>
    </section>
  );
}

export default UserInfo;
