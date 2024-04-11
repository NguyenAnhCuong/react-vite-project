import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { postRegister } from "../utils/api/ApiServices";
import { toast } from "react-toastify";
import Languages from "../header/Languages";
import { useTranslation } from "react-i18next";

const Register = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async () => {
    let res = await postRegister(email, password, username);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>{t("registerpage.header.text1")}?</span>
        <button className="btn-sign-up" onClick={() => navigate("/login")}>
          {t("registerpage.header.login")}
        </button>
        <Languages />
      </div>
      <div className="title col-4 mx-auto">React Vite</div>
      <div className="Welcome col-4 mx-auto">
        {t("registerpage.content.title")}??
      </div>
      <div className="content-form col-3 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="bruce@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>{t("registerpage.content.password")}</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="At least 3 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <span className="icons-eye" onClick={() => setShowpassword(false)}>
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setShowpassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div className="form-group">
          <label>{t("registerpage.content.username")}</label>
          <input
            type="text"
            className="form-control"
            placeholder="bruce"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <button onClick={() => handleSubmit()} className="btn-submit">
            {t("registerpage.content.create")}
          </button>
        </div>
        <div className="back text-center">
          <span onClick={() => navigate("/")}>
            &#60;&#60;{t("registerpage.content.backhome")}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Register;
