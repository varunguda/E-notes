import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const port = "http://localhost:5000";
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  const getUser = async () => {
    setAuthToken(localStorage.getItem("token"));

    if (!authToken) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    };
    try {
      const response = await fetch(`${port}/auth/getuser`, requestOptions);
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      }
      setLoggedIn((prev) => !prev);
      return data;
    } catch (err) {
      console.error("Error fetching user info: " + err);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const loginUser = async (name, password) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, password: password }),
    };
    try {
      const response = await fetch(`${port}/auth/login`, requestOptions);
      const data = await response.json();
      if (data.success) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        localStorage.setItem("token", data.authToken);
        setLoggedIn((prev) => !prev);
        setAuthToken(localStorage.getItem("token"));
      }
      return data;
    } catch (err) {
      console.error(`Error logging in user: ${err}`);
    }
  };

  const signupUser = async (user) => {
    const reqbody = {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    };

    if (user.phoneNo) {
      reqbody.phoneNo = user.phoneNo;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqbody),
    };

    try {
      const response = await fetch(`${port}/auth/createuser`, requestOptions);
      const json = await response.json();
      if (json.success) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        localStorage.setItem("token", json.authToken);
        setLoggedIn((prev) => !prev);
        setAuthToken(localStorage.getItem("token"));
        return json;
      }
      console.error(json.errors.map((elem) => elem.msg));
      return json;
    } catch (err) {
      console.error(`Error creating the user: ${err}`);
    }
  };

  const logout = () => {
    setLoggedIn((prev) => !prev);
    localStorage.removeItem("token");
    setAuthToken(localStorage.getItem("token"));
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, signupUser, loggedIn, authToken, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
