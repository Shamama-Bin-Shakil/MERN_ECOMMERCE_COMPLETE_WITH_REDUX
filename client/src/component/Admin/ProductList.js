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
import {
  clearError,
  getAdminDetail,
  deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
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
      alert.success("Product Delete Successfully");
      navigate("/admin/dashboard");
      dispatch({type: DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminDetail());
  }, [dispatch, alert, error, isDeleted, deleteError]);

  const DeleteBtn = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.3 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
