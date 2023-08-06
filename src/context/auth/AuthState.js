import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const port = "http://localhost:5000";
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [ user, setUser ] = useState({});
  const [ userFetched, setUserFetched ] = useState('')

  const getUser = async () => {

    if (authToken === null) {
      setUserFetched(false);
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
      setUserFetched(true);
      if (!data.success) {
        console.error(data.error);
        return
      }
      setUser(data.user);
      return data;
    } catch (err) {
      console.error("Error fetching user info: " + err);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [authToken])

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
        localStorage.removeItem("token");
        localStorage.setItem("token", data.authToken);
        setAuthToken(localStorage.getItem('token'));
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
        localStorage.removeItem("token")
        localStorage.setItem("token", json.authToken);
        setAuthToken(localStorage.getItem('token'));
        return json;
      }
      return json;
    } catch (err) {
      console.error(`Error creating the user: ${err}`);
    }
  };

  const logoutFn = () => {
    setUserFetched(false);
    localStorage.removeItem("token");
    setAuthToken(localStorage.getItem("token"));
    return
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, signupUser, user, userFetched, authToken, logoutFn }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
