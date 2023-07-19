import "./forgotPassword.css";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearError, forgotPassword } from "../../actions/forgotPasswordAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgetPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (message) {
      alert.success(message);
    }

  }, [dispatch, error, alert, message]);

  const ForgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />

          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={ForgotPasswordSubmit}
              >
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Update Password"
                  className="forgotPasswordBtn"
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
