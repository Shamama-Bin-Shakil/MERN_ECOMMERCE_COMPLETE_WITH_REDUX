import React, { Fragment, useRef } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "./payment.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { clearError, createOrder } from "../../actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  // console.log(order);

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/payment/process",
        {
          method: "POST",
          body: JSON.stringify({ amount: 2000 }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.postal_code,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form
          action=""
          className="paymentForm"
          onSubmit={(e) => submitHandler(e)}
        >
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>

          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>

          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay Rs:${orderInfo && orderInfo.totalPrice}`}
            className="paymentFormBtn"
            ref={payBtn}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
