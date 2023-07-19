import "./processOrder.css";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Button, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetail);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder(id, status));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order Update Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, id, alert, error, updateError, isUpdated]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />

        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="confirmOrderPage">
                <div>
                  <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div>
                      <p>Name: </p>
                      <span>{order.user && order.user.name}</span>
                    </div>

                    <div>
                      <p>Phone: </p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>

                    <div>
                      <p>Address: </p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city} ,${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                      </span>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div>
                        <p>Amount:</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>

                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>{order.orderStatus && order.orderStatus}</p>
                      </div>
                    </div>

                    <div className="confirmCartItems">
                      <Typography>Your Cart Items:</Typography>
                      <div className="confirmCartItemContainer">
                        {order.orderItems &&
                          order.orderItems.map((item) => {
                            return (
                              <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                                <span>
                                  {item.quantity} X Rs ${item.price} =
                                  <b>Rs {item.price * item.quantity}</b>
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    encType="multipart/form-data"
                    onSubmit={updateProductSubmitHandler}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Choose Category</option>
                        {order && order.orderStatus === "Processing" && (
                          <option value="Shipping">Shipping</option>
                        )}
                        {order && order.orderStatus === "Shipping" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      type="submit"
                      id="updateProductBtn"
                      disabed={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Create
                    </Button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
