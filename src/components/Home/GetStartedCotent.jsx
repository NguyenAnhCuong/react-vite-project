import { useNavigate } from "react-router-dom";
import getStarted3 from "../../assets/04.jpg";
import getStarted1 from "../../assets/09.jpg";
import getStarted2 from "../../assets/galaxy.mp4";

const GetStarted = (props) => {
  const { activeTab } = props;
  const navigate = useNavigate();

  return (
    <>
      {activeTab === "introduction" && (
        <>
          <div className="col-lg-6">
            <img className="image-wrapper" src={getStarted1} alt="studio" />
          </div>
          <div className="col-md-4 content">
            <h2>
              Good <span style={{ color: "#ff4400" }}>Design</span>
            </h2>
            <h2 style={{ display: "block" }}>
              Ideas for <span style={{ color: "#ff4400" }}>your</span> fashion
            </h2>
            <p style={{ fontSize: "20px" }}>
              Little Fashion templates comes with{" "}
              <span className="text-onclick" onClick={() => navigate("/login")}>
                sign in
              </span>{" "}
              /{" "}
              <span
                className="text-onclick"
                onClick={() => navigate("/register")}
              >
                sign up
              </span>{" "}
              pages, product listing / product detail, about, FAQs, and contact
              page.
            </p>
            <p style={{ fontSize: "20px" }}>
              Since this HTML template is based on Boostrap CSS library, you can
              feel free to add more components as you need.
            </p>
          </div>
        </>
      )}
      {activeTab === "how-we-work" && (
        <>
          <div className="col-lg-6">
            <video
              muted
              autoPlay
              className="image-wrapper"
              src={getStarted2}
              alt="studio"
            />
          </div>
          <div className="col-md-4 content">
            <h2>Life at Studio</h2>
            <p style={{ fontSize: "20px" }}>
              Over three years in business, We&apos;ve had the chance to work on
              a variety of projects, with companies
            </p>
            <p style={{ fontSize: "20px" }}>
              Custom work is branding, web design, UI/UX design
            </p>
          </div>
        </>
      )}
      {activeTab === "capabilities" && (
        <>
          <div className="col-lg-6">
            <img className="image-wrapper" src={getStarted3} alt="studio" />
          </div>
          <div className="col-md-4 content">
            <h2>What can help you?</h2>
            <p>
              Over three years in business, We&apos;ve had the chance on
              projects
            </p>

            <div className="skill">
              <div className="label">Branding</div>
              <div className="progress">
                <div className="progress-bar" style={{ width: "90%" }} />
              </div>
              <div className="value">90%</div>
            </div>

            <div className="skill">
              <div className="label">Design & Strategy</div>
              <div className="progress">
                <div className="progress-bar" style={{ width: "70%" }} />
              </div>
              <div className="value">70%</div>
            </div>

            <div className="skill">
              <div className="label">Online Platform</div>
              <div className="progress">
                <div className="progress-bar" style={{ width: "80%" }} />
              </div>
              <div className="value">80%</div>
            </div>

            <div className="explore">EXPLORE PRODUCTS</div>
          </div>
        </>
      )}
    </>
  );
};

export default GetStarted;
