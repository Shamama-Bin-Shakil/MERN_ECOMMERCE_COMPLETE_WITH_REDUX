import "./ResetPassword.css";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearError, resetPassword } from "../../actions/forgotPasswordAction";
import { useAlert } from "react-alert";
import { LoadUserDetail } from "../../actions/userAction";
import MetaData from "../layout/MetaData";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password Updated Successfully");
      dispatch(LoadUserDetail());
      navigate("/auth");
    }
  }, [dispatch, error, alert, success, navigate]);

  const ResetPasswordSubmit = (e) => {
    e.preventDefault();
    const data = { token, newPassword, confirmPassword };
    dispatch(resetPassword(data));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />

          <div className="ResetPasswordContainer">
            <div className="ResetPasswordBox">
              <h2 className="ResetPasswordHeading">Reset Password</h2>
              <form
                className="ResetPasswordForm"
                onSubmit={ResetPasswordSubmit}
              >

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="text"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Reset Password"
                  className="ResetPasswordBtn"
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

export default ResetPassword;
