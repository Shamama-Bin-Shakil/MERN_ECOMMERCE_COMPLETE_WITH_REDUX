import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import Home from "./component/Home/Home";
import { Fragment, useEffect, useState } from "react";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import CheckCookie from "./CheckCookie";
import store from "./store";
import { LoadUserDetail } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UserProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./component/Cart/Success";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const response = await fetch("http://localhost:4000/api/v1/stripeapikey", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);
    setStripeApiKey(result.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(LoadUserDetail());
    getStripeApiKey();
  }, []);

  return (
    <Fragment>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/search" element={<Search />}></Route>
          {/* Protected Route --- START */}
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route
              path="/process/payment"
              element={
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                )
              }
            />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />

            {/* Admin Route */}
            <Route
              isAdmin={true}
              path="/admin/dashboard"
              element={<Dashboard />}
            />

            <Route
              isAdmin={true}
              path="/admin/products"
              element={<ProductList />}
            />
            <Route
              isAdmin={true}
              path="/admin/product"
              element={<NewProduct />}
            />

            <Route
              isAdmin={true}
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />

            <Route
              isAdmin={true}
              path="/admin/orders"
              element={<OrderList />}
            />

            <Route
              isAdmin={true}
              path="/admin/order/:id"
              element={<ProcessOrder />}
            />

            <Route isAdmin={true} path="/admin/users" element={<UserList />} />

            <Route
              isAdmin={true}
              path="/admin/user/:id"
              element={<UpdateUser />}
            />

            <Route
              isAdmin={true}
              path="/admin/reviews"
              element={<ProductReviews />}
            />
          </Route>
          {/* Protected Route --- END */}
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/auth" element={<LoginSignUp />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/checkcookie" element={<CheckCookie />}></Route>
          NotFound
        </Routes>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
