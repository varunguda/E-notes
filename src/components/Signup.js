import React, { useContext, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signupUser } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",
    phoneNo:""
  });
  const [ checked, setChecked ] = useState(false)
  const [ valid, setValid ] = useState(false);

  const createHandler = (e) =>{
    e.preventDefault();
    if(!valid){
      return;
    }
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
      if(!data.success){
        console.log(data)
        if(data.errors.some(err=> err.msg.userExist)){
          const userDis = document.querySelector('.username-disclaimer');
          userDis.innerHTML = 'This username is already taken!'
          userDis.classList.remove('hide')
        }
      }
    })
  }

  const validateForm = (e) =>{
    usernameValidator(e);
    fullNameValidator(e);
    emailValidator(e);
    passwordValidator(e);
    phoneNoValidator(e);

    setValid(usernameValidator(e) && fullNameValidator(e) && emailValidator(e) && passwordValidator(e) && phoneNoValidator(e) && checked)
  }

  const checkHandler = (e) =>{
    setChecked(e.target.checked);
    setValid(usernameValidator(e) && fullNameValidator(e) && emailValidator(e) && passwordValidator(e) && phoneNoValidator(e) && e.target.checked)
  }

  const changeHandler = (e) =>{
    e.preventDefault()
    validateForm(e);
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const phoneNoValidator = (e) =>{
    const phoneDis = document.querySelector('.phoneNo-disclaimer');
    if(e.target.name !== 'phoneNo'){
      if(phoneDis.innerHTML === ''){
        return true
      }
      return false
    }
    if(e.target.value.length === 0){
      phoneDis.innerHTML = ''
      return true;
    }
    const regex = /^\d{10}$/;
    if(e.target.value.length<10 || e.target.value.length>10 || !regex.test(e.target.value)){
      phoneDis.innerHTML = "Please enter a valid phone number";
      phoneDis.classList.remove('hide');
      return false;
    }
    phoneDis.innerHTML = ''
    phoneDis.classList.add('hide');
    return true;
  }

  const passwordValidator = (e) =>{
    const passDis = document.querySelector('.password-disclaimer');
    if(e.target.name !== 'password'){
      if(passDis.innerHTML === ''){
        return true;
      }
      return false
    }
    if(e.target.value.length===0){
      passDis.innerHTML = "Password must contain atleast 8 characters";
      passDis.classList.add('hide');
      return false;
    }
    if(e.target.value.length<8){
      passDis.innerHTML = "Password must contain atleast 8 characters";
      passDis.classList.remove('hide');
      return false;
    }
    if(e.target.value.length>24){
      passDis.innerHTML = "Password too long!";
      passDis.classList.remove('hide');
      return false;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|~-])(?=.*\d).+$/;
    if(!regex.test(e.target.value)){
      passDis.innerHTML = "A password must contain 1 lowercase alphabet, 1 uppercase alphabet, 1 speacial character and a number";
      passDis.classList.remove('hide');
      return false;
    }
    passDis.innerHTML = '';
    passDis.classList.add('hide');
    return true;
  }

  const emailValidator = (e) =>{
    const emailDis = document.querySelector('.email-disclaimer');
    if(e.target.name !== 'email'){
      if(emailDis.innerHTML === ''){
        return true;
      }
      return false
    }
    if(e.target.value === 0){
      emailDis.innerHTML = "Please enter a valid email";
      emailDis.classList.add('hide');
      return false
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(e.target.value)){
      emailDis.innerHTML = "Please enter a valid email";
      emailDis.classList.remove('hide');
      return emailRegex.test(e.target.value);
    }
    emailDis.innerHTML = ''
    emailDis.classList.add('hide');
    return emailRegex.test(e.target.value);
  }

  const fullNameValidator = (e) =>{
    const nameDis = document.querySelector('.fullName-disclaimer');
    if(e.target.name !== 'fullName'){
      if( nameDis.innerHTML === ''){
        return true
      }
      return false
    }
    if(e.target.value.length===0){
      nameDis.innerHTML = "Name must contain atleast 5 characters"
      nameDis.classList.add('hide');
      return false
    }
    if(e.target.value.length<5){
      nameDis.innerHTML = "Name must contain atleast 5 characters"
      nameDis.classList.remove('hide');
      return false
    }
    if(e.target.value.length>20){
      nameDis.innerHTML = "Name is too long!"
      nameDis.classList.remove('hide');
      return false
    }
    nameDis.innerHTML = ''
    nameDis.classList.add('hide');
    return true
  }

  const usernameRegex = (name) =>{
      // Regular expression to check if the name has only lowercase letters, numbers and (_)
      const lowercaseRegex = /^(?!^\d)(?=.*[a-z])^[a-z\d_]+$/;

      // Test the name against the regular expression
      return lowercaseRegex.test(name);
  }

  const usernameValidator = (e) =>{
    const userDis = document.querySelector('.username-disclaimer');
    if(e.target.name !== 'username'){
      if(userDis.innerHTML === ''){
        return true
      }
      return false
    }
    if(e.target.value.length === 0){
      userDis.innerHTML = "A username must contain atleast 3 characters";
      userDis.classList.add('hide');
      return false;
    }
    if(e.target.value.length < 3){
      userDis.innerHTML = "A username must contain atleast 3 characters";
      userDis.classList.remove('hide');
      return false;
    }
    if(e.target.value.length > 14){
      userDis.innerHTML = "username is too long!";
      userDis.classList.remove('hide');
      return false;
    }
    if(!usernameRegex(e.target.value)){
     userDis.innerHTML = "Invalid charcters in username, a username can only have lowercase alphabets, _ and numbers";
     userDis.classList.remove('hide');
     return false;
    }
    userDis.innerHTML = ''
    userDis.classList.add('hide');
    return true;
  }

  return (
    <form className="row g-3 justify-content-center" onSubmit={createHandler}>
      <div className="col-md-10 mb-4">
        <label htmlFor="username" className="form-label">
          username *
        </label>
        <div className="input-group">
          <span className="input-group-text" id="inputGroupPrepend2">
            @
          </span>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="inputGroupPrepend2"
            name="username"
            onChange={changeHandler}
          />
        </div>
        <span className="username-disclaimer disclaimer hide"></span>
      </div>
      <div className="col-md-5 mb-4">
        <label htmlFor="fullName" className="form-label">
          Full Name *
        </label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          onChange={changeHandler}
        />
          <span className="fullName-disclaimer disclaimer hide">Name must contain atleast 5 characters</span>
      </div>
      <div className="col-md-5 mb-4">
        <label htmlFor="phoneNo" className="form-label">
          Phone No
        </label>
        <input
          type="text"
          className="form-control"
          id="phoneNo"
          name="phoneNo"
          onChange={changeHandler}
        />
          <span className="phoneNo-disclaimer disclaimer hide"></span>
      </div>
      <div className="col-md-10 mb-4">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={changeHandler}
        />
          <span className="email-disclaimer disclaimer hide">Invalid Email</span>
      </div>
      <div className="col-md-10 mb-4">
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={changeHandler}
        />
          <span className="password-disclaimer disclaimer hide">Password must contain atleast 8 characters</span>
      </div>
      <div className="col-10 mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkbox"
            onChange={checkHandler}
          />
          <label className="form-check-label" htmlFor="checkbox">
            Agree to terms and conditions
          </label>
          <span className="terms-disclaimer disclaimer hide">Please agree to the terms & conditions to proceed</span>
        </div>
      </div>
      <div className="col-10 d-flex align-items-center justify-content-between">
        <button className="btn btn-warning" type="submit" disabled={!valid}>
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
