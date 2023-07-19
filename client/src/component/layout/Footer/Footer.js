import playStore from "../../../assets/Appstore.png";
import appStore from "../../../assets/playstore.png";
import "./Footer.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and IOS mobile phone</p>
          <img src={playStore} alt="playStore" />
          <img src={appStore} alt="appStore" />
        </div>

        <div className="midFooter">
          <h1>Ecommerce</h1>
          <p>High Qanlity is our first priority</p>
          <p>CopyRights 2020 - {new Date().getFullYear()} &copy; Developer</p>
        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <Link to="/">Instagram</Link>
          <Link to="/">Youtube</Link>
          <Link to="/">Facebook</Link>
          <Link to="/">Twitter</Link>
        </div>
      </footer>
    </>
  );
};

export default Header;
