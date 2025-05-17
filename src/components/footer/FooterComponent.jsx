import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const FooterComponent = () => {
  return (
    <>
      <div className="container footer-content">
        <div className="row">
          <div className="footer-item col-lg-4">
            <h4 className="mb-3 footer-title">
              Little <span className="subtitle">Quiz</span>
            </h4>
            <p className="mt-lg-5 mb-4">Copyright © 2045 Little Quiz</p>
            <p>Designed by Tooplate</p>
          </div>
          <div className="footer-item col-lg-4">
            <h5 className="mb-3">Sitemap</h5>
            <ul className="sitemap-list">
              <li>
                <a href="#">Story</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="footer-item col-lg-4">
            <h5 className="mb-3">Social</h5>
            <div className="social-icons">
              <FaFacebookF className="icons" />
              <FaTwitter className="icons" />
              <FaInstagram className="icons" />
              <FaLinkedin className="icons" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterComponent;
