import { useState } from "react";
import "./Login.scss";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { postLogin } from "../utils/api/userServices";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLogin = async () => {
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
    setIsLoading(true);
    //api
    const response = await postLogin(email, password);
    if (response && response.EC === 0) {
      dispatch(doLogin(response));
      toast.success(response.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(response.EM);
      setIsLoading(false);
      setPassword("");
    }
  };
  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Not have account??</span>
        <button onClick={() => navigate("/register")}>Sign Up</button>
        {/* <Language /> */}
      </div>
      <div className="title col-4 mx-auto">Manage Your Task</div>
      <div className="welcome col-4 mx-auto">Hello...</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            placeholder="abc@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            type={"email"}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            placeholder="123456"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={"password"}
            className="form-control"
            onKeyDown={(event) => handlePressEnter(event)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            disabled={isLoading}
            onClick={() => handleLogin()}
            className="btn btn-dark"
          >
            {isLoading === true && <FaSpinner className="loading-icon" />}
            <span>Login to Quizz</span>
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
  );
};

export default Login;
