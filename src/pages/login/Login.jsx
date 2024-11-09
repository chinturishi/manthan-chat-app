import "./login.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { signUp,login } from "../../config/firebase.config";

const Login = () => {
  console.log("Login-1");
  const [currentState, setCurrentState] = useState("Login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler=(event)=>{
    console.log("Login submit");
    event.preventDefault();
    if(currentState==='Sign up'){
      signUp(userName,email,password);
    }
    else if(currentState==='Login'){
      login(email,password);
    }
  }

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h2>{currentState}</h2>
        {currentState === "Sign up" ? (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            required
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        ) : null}
        <input
          type="email"
          placeholder="Email Address"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-term">
          {" "}
          <input type="checkbox"  required/>
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className="login-forgot">
          {currentState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account{" "}
              <span onClick={() => setCurrentState("Login")}>Click here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account{" "}
              <span onClick={() => setCurrentState("Sign up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
