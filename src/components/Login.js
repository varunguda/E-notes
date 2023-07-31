import React, { useContext, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    password: ""
  });

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser(credentials.name, credentials.password).then(data=>{
      if(data.success){
        localStorage.setItem('token', data.authToken);
        navigate('/')
      }
    }).catch(err=>{
      console.log(err);
    })
  };
  
  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
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
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
