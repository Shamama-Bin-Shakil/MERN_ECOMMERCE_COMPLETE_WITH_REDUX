import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonalIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/userAction";
import Backdrop from "@material-ui/core/Backdrop";
const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };

  const account = () => {
    navigate("/account");
  };

  const cart = () => {
    navigate("/cart");
  };

  const logout = () => {
    dispatch(logoutUser());
    alert.success("Logout Successfully");
  };

  const option = [
    { icon: <ListAltIcon />, name: "Order", func: orders },
    { icon: <PersonalIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user.role === "admin") {
    option.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDail Tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        className="speedDial"
        icon={
          <img className="speedDialIcon" src={user.avatar.url} alt="image" />
        }
      >
        {option.map((elem, index) => {
          return (
            <SpeedDialAction
              key={index}
              icon={elem.icon}
              tooltipTitle={elem.name}
              onClick={elem.func}
              tooltipOpen
            />
          );
        })}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
