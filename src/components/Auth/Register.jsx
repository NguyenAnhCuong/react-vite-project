import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import "./Register.scss";
import { postRegister } from "../utils/api/userServices";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ishowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  function validateEmail(sEmail) {
    var filter =
      /^([\w-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmitUser = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let respone = await postRegister(email, password, name);
    if (respone && respone.EC === 0) {
      toast.success(respone.EM);
      navigate("/login");
    } else {
      toast.error(respone.error);
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="header">
          <span>Already have account??</span>
          <button onClick={() => navigate("/login")}>Login</button>
          {/* <Language /> */}
        </div>
        <div className="title col-4 mx-auto">Sign Up</div>
        <div className="welcome col-4 mx-auto">Hello</div>
        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            <label>Email(*)</label>
            <input
              value={email}
              placeholder="abc@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
              type={"email"}
              className="form-control"
            />
          </div>
          <div className="form-group pass-group">
            <label>Password(*)</label>
            <input
              placeholder="123456"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={ishowPassword ? "text" : "password"}
              className="form-control"
            />
            {ishowPassword ? (
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(false)}
              >
                <VscEye />
              </span>
            ) : (
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(true)}
              >
                <VscEyeClosed />
              </span>
            )}
          </div>
          <div className="form-group">
            <label>User name</label>
            <input
              placeholder="erika"
              value={name}
              onChange={(event) => setName(event.target.value)}
              type={"text"}
              className="form-control"
            />
          </div>
          <span className="forgot-password">Forgot password?</span>
          <div>
            <button onClick={() => handleSubmitUser()} className="btn btn-dark">
              Create my account
            </button>
          </div>
          <div className="text-center">
            <span
              className="back"
              onClick={() => {
                navigate("/");
              }}
            >
              &#60;&#60; Go to Home Page
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
