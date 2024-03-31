import React from "react";
import "./HomePage.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const HomePage = (props) => {
  return (
    <div className="homepage">
      <div className="search-container">
        <div className="d-flex justify-content-center">
          <Row>
            <Col>
              <Form className="box d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button>Search</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <div className="main-content mt-5">
        <div className="title">
          <h1>
            <span>Cả doanh nghiệp một nền tảng</span>
          </h1>
          <h2>
            <span>Đơn giản - Hiệu quả - Tiết kiệm</span>
          </h2>
        </div>
        <div className="content mt-5">
          <div>
            <button className="btn btn-primary">Bat dau</button>
          </div>
          <div>
            <button className="btn btn-success">Thu ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
