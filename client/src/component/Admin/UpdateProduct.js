import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import StorageIcon from "@material-ui/icons/Storage";
import DescriptionIcon from "@material-ui/icons/Description";
import {
  clearError,
  getProductDetail,
  updateProduct,
} from "../../actions/productAction";
import "./updateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const categories = ["Laptops", "Camera", "clothing", "jewelery"];

  const { error, products } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (products && products._id !== id) {
      dispatch(getProductDetail(id));
    } else {
      setName(products.name);
      setPrice(products.price);
      setDescription(products.description);
      setCategory(products.category);
      setOldImages(products.images);
      setStock(products.stock);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, isUpdated, id, products, updateError, navigate]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myFrom = { name, price, description, category, stock, images };
    dispatch(updateProduct(id, myFrom));
  };

  const updateProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => {
                  return (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFromFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImageChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  );
                })}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => {
                return <img key={index} src={image} alt="Product Preview" />;
              })}
            </div>

            <Button
              type="submit"
              id="createProductBtn"
              disabed={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
