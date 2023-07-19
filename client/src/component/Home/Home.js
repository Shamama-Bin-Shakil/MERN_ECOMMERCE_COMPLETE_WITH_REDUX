import { Fragment, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MetaData from "../layout/MetaData";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );


  useEffect(() => {
    // eslint-disable-next-line
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <AiFillCaretDown />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((element) => {
                return <ProductCard key={element._id} product={element} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
