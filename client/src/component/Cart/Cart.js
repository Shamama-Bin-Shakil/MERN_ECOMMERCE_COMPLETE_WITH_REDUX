import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCartItem, removeItemsFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) return;
    const newQty = quantity + 1;
    dispatch(addToCartItem(id, newQty));
  };

  const decreaseQuantity = (id, quantity, stock) => {
    if (1 >= quantity) return;
    const newQty = quantity - 1;
    dispatch(addToCartItem(id, newQty));
  };
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/auth?redirect=shipping");
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Product</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className="cartContainer" key={item}>
                    <CartItemCard
                      item={item}
                      deleteCartItem={deleteCartItems}
                    />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`Rs${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                );
              })}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
