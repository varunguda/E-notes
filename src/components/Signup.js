import React, { useContext, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",
    phoneNo:""
  });
  const [ checked, setChecked ] = useState(false)

  const { signupUser } = useContext(AuthContext);

  const createHandler = (e) =>{
    e.preventDefault();
    if(checked){
      signupUser(user).then((data)=>{
        if(data.success){
          navigate('/');
          setUser({
            username: "",
            fullName: "",
            password: "",
            email: "",
            phoneNo:""
          });
        }
      })
    }
  }

  const changeHandler = (e) =>{
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const checkHandler = (e) =>{
    if(e.target.checked){
      setChecked(prev=>!prev)
    }
    else{
      setChecked(prev=>!prev)
    }
  }

  return (
    <form className="row g-3 justify-content-center" onSubmit={createHandler}>
      <div className="col-md-5">
        <label htmlFor="validationDefaultUsername" className="form-label">
          Username *
        </label>
        <div className="input-group">
          <span className="input-group-text" id="inputGroupPrepend2">
            @
          </span>
          <input
            type="text"
            className="form-control"
            id="validationDefaultUsername"
            aria-describedby="inputGroupPrepend2"
            required=""
            name="username"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="col-md-5">
        <label htmlFor="validationDefault01" className="form-label">
          Full Name *
        </label>
        <input
          type="text"
          className="form-control"
          id="validationDefault01"
          required=""
          name="fullName"
          onChange={changeHandler}
        />
      </div>
      <div className="col-md-10">
        <label htmlFor="validationDefaultEmail" className="form-label">
          Email *
        </label>
        <input
          type="email"
          className="form-control"
          id="validationDefaultEmail"
          required=""
          name="email"
          onChange={changeHandler}
        />
      </div>
      <div className="col-md-5">
        <label htmlFor="validationDefaultPassword" className="form-label">
          Password *
        </label>
        <input
          type="password"
          className="form-control"
          id="validationDefaultPassword"
          required=""
          name="password"
          onChange={changeHandler}
        />
      </div>
      <div className="col-md-5">
        <label htmlFor="validationDefault05" className="form-label">
          Phone No
        </label>
        <input
          type="text"
          className="form-control"
          id="validationDefault05"
          required=""
          name="phoneNo"
          onChange={changeHandler}
        />
      </div>
      <div className="col-10">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="invalidCheck2"
            required=""
            onChange={checkHandler}
          />
          <label className="form-check-label" htmlFor="invalidCheck2">
            Agree to terms and conditions
          </label>
        </div>
      </div>
      <div className="col-10 d-flex align-items-center justify-content-between">
        <button className="btn btn-primary" type="submit">
          Create Account
        </button>

        <span>
          Already have an account?&nbsp;
          <Link 
          to='/login' 
          style={{
            textDecoration:'none',
            color: 'rgb(255 195 0)'
          }}>
            Login here
          </Link>
        </span>
      </div>
    </form>
  );
};

export default Signup;
