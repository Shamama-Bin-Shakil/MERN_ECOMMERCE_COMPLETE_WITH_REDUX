import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import StorageIcon from "@material-ui/icons/Storage";
import DescriptionIcon from "@material-ui/icons/Description";
import { clearError, createProduct } from "../../actions/productAction";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const categories = ["Laptops", "Camera", "clothing", "jewelery"];

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myFrom = { name, price, description, category, stock, images };
    dispatch(createProduct(myFrom));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
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
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
              <select onChange={(e) => setCategory(e.target.value)}>
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
                onChange={createProductImageChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => {
                return <img key={index} src={image} alt="Avatar Preview" />;
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

export default NewProduct;
