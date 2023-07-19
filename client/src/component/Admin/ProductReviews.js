import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {
  clearError,
  getAllReview,
  deleteReview,
} from "../../actions/productAction";
import "./productReview.css";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { DataGrid } from "@material-ui/data-grid";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReview
  );

  const [productId, setProductId] = useState("");

  const DeleteBtn = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReview(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate,productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 270,
      flex: 0.5,
    },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 350,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReview(productId));
  };

  return (
    <Fragment>
      <MetaData title="ALL REVIEWS" />
      <div className="dashboard">
        <Sidebar />

        <div className="productReviewsContainer">
          <h1 id="productListHeading">ALL REVIEWS</h1>

          <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">Update Product</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              id="createProductBtn"
              disabed={loading ? true : false || productId ? true : false}
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h2 className="productReviewsFormHeading">No Review Found</h2>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
