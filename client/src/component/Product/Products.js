import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");

  const categories = ["Laptops", "Camera", "clothing", "jewelery"];

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          <MetaData title="PRODUCTS -- ECOMMERCE" />

          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((category) => {
                return (
                  <li
                    key={category}
                    className="category-link"
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>

            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continuous-slider" 
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
