import "./orderDetail.css";
import { Link, useParams } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { getOrderDetails } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, order, error } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, id, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Detail" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
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
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => {
                    return (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />

                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X Rs {item.price} ={" "}
                          <b>Rs ${item.price * item.quantity}</b>
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
