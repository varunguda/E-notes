import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Content = (props) => {
  const { loggedin, logoutFn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    logoutFn();
  };

  useEffect(() => {
    if (!loggedin) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [loggedin]);

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "90px" }}
        data-bs-theme="dark"
      >
        <div
          className="modal fade"
          id="exampleModalLogout"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Are you sure you want to log out?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                You need your Email or username & Password to log back in again
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={logoutHandler}
                  data-bs-dismiss="modal"
                >
                  Yes, log me out
                </button>
              </div>
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Content;
