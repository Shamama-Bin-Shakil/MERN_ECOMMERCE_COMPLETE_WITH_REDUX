import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DELETE_USER_REST } from "../../constants/userConstants";
import { clearError, deleteUser, getAllUser } from "../../actions/userAction";
const UserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUser);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("User Delete Successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_REST });
    }
    dispatch(getAllUser());
  }, [dispatch, alert, error, isDeleted, deleteError]);

  const DeleteBtn = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => DeleteBtn(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  return (
    <Fragment>
      <MetaData title="ALL USERS - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
