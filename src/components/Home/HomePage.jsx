import React from "react";
import "./HomePage.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { t } = useTranslation();

  return (
    <div className="homepage">
      <div className="search-container">
        <div className="d-flex justify-content-center">
          <Row>
            <Col>
              <Form className="box d-flex">
                <Form.Control
                  type="search"
                  placeholder={t("homepage.search")}
                  className="me-2"
                  aria-label="Search"
                />
                <Button>{t("homepage.search")}</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <div className="main-content mt-5">
        <div className="title">
          <h1>
            <span>{t("homepage.title1")}</span>
          </h1>
          <h2>
            <span>{t("homepage.title2")}</span>
          </h2>
        </div>
        <div className="content mt-5">
          <div>
            {isAuthenticated === true ? (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/user")}
              >
                {t("homepage.login2")}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                {t("homepage.login1")}
              </button>
            )}
          </div>
          <div>
            <button className="btn btn-success">{t("homepage.button3")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
