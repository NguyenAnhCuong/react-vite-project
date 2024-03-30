import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../utils/api/ApiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner3 } from "react-icons/im";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);

  const handleLogin = async () => {
    //validate
    //submit api
    setIsloading(true);
    let res = await postLogin(email, password);
    if (res && res.EC === 0) {
      dispatch(doLogin());
      toast.success(res.EM);
      setIsloading(false);
      navigate("/");
    } else {
      toast.error(res.EM);
      setIsloading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account?</span>
        <button className="btn-sign-up" onClick={() => navigate("/register")}>
          Sign up
        </button>
        <span className="help">Need help?</span>
      </div>
      <div className="title col-4 mx-auto">React Vite</div>
      <div className="Welcome col-4 mx-auto">Hello,My friend??</div>
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
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="At least 3 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            onClick={() => handleLogin()}
            className="btn-submit"
            disabled={isLoading}
          >
            {isLoading === true && <ImSpinner3 className="loader-icon" />}
            <span>Log in to React Vite</span>
          </button>
        </div>
        <div className="back text-center">
          <span onClick={() => navigate("/")}>&#60;&#60;Go Back Home</span>
        </div>
      </div>
    </div>
  );
};
export default Login;
