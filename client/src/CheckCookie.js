import React, { useEffect } from "react";
import axios from "axios";

const CheckCookie = () => {
  const call = async () => {
    const data = await axios.get("http://localhost:4000/setcookie");
    console.log(data);
  };

  useEffect(() => {
    call();
  }, []);

  return (
    <>
      <div className="container">
        <h1>checking Cookies</h1>
      </div>
    </>
  );
};

export default CheckCookie;
