import "./HomePage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import silde1 from "../../assets/07.jpg";
import silde2 from "../../assets/17.jpg";
import silde3 from "../../assets/18.jpg";
import { useState } from "react";
import GetStarted from "./GetStartedCotent";
import FooterComponent from "../footer/FooterComponent";

const HomePage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="homepage">
      <Swiper
        direction="vertical"
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="swiper"
      >
        <SwiperSlide>
          <img src={silde1} alt="slide1" />
          <div className="slide-content">
            <h1>Cool Fashion</h1>
            <p>
              Little Fashion template come with total 9 HTML pages provided by
              Tooplate website.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={silde2} alt="slide2" />
          <div className="slide-content">
            <h1>New Design</h1>
            <p>Please share this Little Fashion template to your friends.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={silde3} alt="slide3" />
          <div className="slide-content">
            <h1>Talk to us</h1>
            <p>
              Tooplate is one of the best HTML CSS template websites for
              everyone
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="main-content my-5 container">
        <div className="title">
          <h1>
            <span>{t("homepage.title1")}</span>
          </h1>
        </div>
        <div className="row my-5">
          <div className="col-lg-2 sidebar">
            <ul>
              <li
                className={activeTab === "introduction" ? "active" : ""}
                onClick={() => setActiveTab("introduction")}
              >
                Introduction
              </li>
              <li
                className={activeTab === "how-we-work" ? "active" : ""}
                onClick={() => setActiveTab("how-we-work")}
              >
                How we work?
              </li>
              <li
                className={activeTab === "capabilities" ? "active" : ""}
                onClick={() => setActiveTab("capabilities")}
              >
                Capabilities
              </li>
            </ul>
          </div>
          {activeTab !== "" && (
            <GetStarted activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
      <div className="footer-container">
        <FooterComponent />
      </div>
    </div>
  );
};
export default HomePage;
