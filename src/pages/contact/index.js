import { Button, TextArea, TextBox, Validator } from "devextreme-react";
import { EmailRule, RequiredRule } from "devextreme-react/data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

function Contact() {
  const { t } = useTranslation();
  return (
    <section className="contact-us container">
      <div className="contact-us__form">
        <h2>Contact us</h2>
        <form>
          <TextBox name="name" placeholder="name">
            <RequiredRule message={`${t("name")} ${t("isRequired")}`} />
          </TextBox>
          <TextBox name="email" placeholder="email">
            <Validator>
              <RequiredRule message={`${t("email")} ${t("isRequired")}`} />
              <EmailRule message={`${t("email")} ${t("isInvalid")}`} />
            </Validator>
          </TextBox>
          <TextArea placeholder="message" />
          <Button text={t("Submit")} useSubmitBehavior={true} />
        </form>
      </div>
      <div className="contact-us__message">
        <h3>{"What's on your mind?"}</h3>
        <span>Have a questions?</span>
        <br />
        <span>Want an answer?</span>
        <br />
        <span>Or some information?</span>
        <br />
        <span>
          Please write to us and we will get back to you as soon as we can.
        </span>
      </div>
    </section>
  );
}

export default Contact;
