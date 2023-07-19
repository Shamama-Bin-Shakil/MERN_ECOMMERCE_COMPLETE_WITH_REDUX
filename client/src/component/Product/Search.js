import React, { Fragment, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
const Search = () => {
  const navigate = useNavigate();
  const [keyboard, setkeyboard] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (keyboard.trim()) {
      navigate(`/products/${keyboard}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <Fragment>
          <MetaData title={`Search A Products -- ECOMMERCE`} />

      <form className="searchBox" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setkeyboard(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
