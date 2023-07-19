import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDetail } from "../../actions/productAction";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUser } from "../../actions/userAction";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrder);
  const { users } = useSelector((state) => state.allUser);

  let OutofStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        OutofStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminDetail());
    dispatch(getAllOrders());
    dispatch(getAllUser());
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  Chart.register(CategoryScale);
  const lineState = {
    labels: ["Initital Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [OutofStock, products.length - OutofStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
