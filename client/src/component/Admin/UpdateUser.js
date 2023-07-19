import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserDetails,
  updateUser,
  clearError,
} from "../../actions/userAction";
import { UPDATE_USER_REST } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const categories = ["Laptops", "Camera", "clothing", "jewelery"];

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.userProfile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("User Update Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_REST });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, id, navigate]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myFrom = { name, email, role };
    dispatch(updateUser(id, myFrom));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />

        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <MailOutlineIcon />
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <Button
                type="submit"
                id="createProductBtn"
                disabed={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
