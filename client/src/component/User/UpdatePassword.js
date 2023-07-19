import "./UpdatePassword.css";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearError, updatePassword } from "../../actions/userProfile";
import { useAlert } from "react-alert";
import { LoadUserDetail } from "../../actions/userAction";
import { UPDATE_PROFILE_REST } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfile
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(LoadUserDetail());
      navigate("/account");

      dispatch({ type: UPDATE_PROFILE_REST });
    }
  }, [dispatch, error, alert, isUpdated, user, navigate]);

  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const data = { oldPassword, newPassword, confirmPassword };
    dispatch(updatePassword(data));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Password" />

          <div className="UpdatePasswordContainer">
            <div className="UpdatePasswordBox">
              <h2 className="UpdatePasswordHeading">Update Password</h2>
              <form
                className="UpdatePasswordForm"
                onSubmit={UpdatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="text"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
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
                  value="Update Password"
                  className="UpdatePasswordBtn"
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

export default UpdatePassword;
