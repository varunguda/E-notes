import React, { useContext, useRef, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  const alertRef = useRef(null);

  const appendAlert = (message, type) => {
    alertRef.current.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    // setTimeout(()=>{
    //   alertRef.current.innerHTML = ""
    // },3000)
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (credentials.name === "" || credentials.password === "") {
      return appendAlert("Please enter valid username or password", "warning");
    }
    loginUser(credentials.name, credentials.password)
      .then((data) => {
        if (!data.success) {
          setCredentials({ ...credentials, password:""})
          return appendAlert(
            "Invalid username or password",
            "danger"
          );
        }
        navigate("/");
      })
  };

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div id="liveAlertPlaceholder" className="mx-5" ref={alertRef}></div>

      <form className="mx-5" onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Uesrname or Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={changeHandler}
          />
          <div id="emailHelp" className="form-text">
            We'll share your email with everyone else.
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={changeHandler}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
          <span>
            New to Enotes?&nbsp;
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "rgb(255 195 0)",
              }}
            >
              Signup here
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
