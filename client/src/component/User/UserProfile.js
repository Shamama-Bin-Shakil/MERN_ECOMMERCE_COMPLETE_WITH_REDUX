import "./UpdateProfile.css";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearError, updateProfile } from "../../actions/userProfile";
import { useAlert } from "react-alert";
import { LoadUserDetail } from "../../actions/userAction";
import { UPDATE_PROFILE_REST } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/logo512.png");

  const alert = useAlert();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const registerDataChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setAvatar(base64);
  };

  const UpdateProfileSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, avatar };
    dispatch(updateProfile(data));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />

          <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="UpdateProfileForm"
                encType="multipart/form-data"
                onSubmit={UpdateProfileSubmit}
              >
                <div className="UpdateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="UpdateProfileEmail">
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

                <div id="UpdateProfileImage">
                  {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Profile"
                  className="UpdateProfileBtn"
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

export default UserProfile;
