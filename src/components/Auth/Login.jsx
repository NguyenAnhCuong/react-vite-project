import { useState } from "react";
import "./Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <div className="login-container">
      <div className="header">
        Don't have an account?
        <button className="btn-sign-up">Sign up</button>
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
          <button onClick={() => handleLogin()} className="btn-submit">
            Log in to React Vite
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
