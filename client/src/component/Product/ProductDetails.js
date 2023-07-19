import { useEffect, useState } from "react";
import { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import {
  clearError,
  getProductDetail,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import MetaData from "../layout/MetaData";
import { addToCartItem } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useAlert } from "react-alert";
const ProductDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const alert = useAlert();
  const { loading, error, products } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetail(id));
    // eslint-disable-next-line
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    size: "large",
    value: products.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (products.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const addToCart = (productId, quantity) => {
    dispatch(addToCartItem(productId, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const data = { rating, comment, id };
    dispatch(newReview(data));
    setOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${products.name} -- ECOMMERCE`} />

          <div className="ProductDetails">
            <div className="productDetailImage">
              <Carousel>
                {products.images &&
                  products.images.map((item, i) => {
                    return (
                      <img
                        className="CarouselImage"
                        key={item._id}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    );
                  })}
              </Carousel>
            </div>

            <div className="productD">
              <div className="detailsBlock-1">
                <h2>{products.name}</h2>
                <p>Product # {products._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">({products.numOfReviews} reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`Rs ${products.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={products.stock < 1 ? true : false}
                    onClick={() => addToCart(products._id, quantity)}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={products.stock < 1 ? "redColor" : "greenColor"}>
                    {products.stock < 1 ? "OutofStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{products.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                value={comment}
                cols="30"
                rows="5"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {products.reviews && products.reviews[0] ? (
            <div className="reviews">
              {products.reviews &&
                products.reviews.map((review) => {
                  // console.log(review);
                  return <ReviewCard review={review} />;
                })}
            </div>
          ) : (
            <p className="noReviews">No Review Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
