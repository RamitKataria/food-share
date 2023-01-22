import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/layout.css";
import user from "../styles/user.png";
import "../styles/search.css";
import ListingLeft from "./createListing";
import ListingRight from "./searchListing";

const Layout = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const signOut = async () => {
    navigate("/login");
  };

  const navbar = () => {
    return (
      <nav className="navbar navbar-dark bg-dark justify-content-between navbar-head">
        <a className="navbar-brand">
          {" "}
          <h1>Food Share ❤️</h1>{" "}
        </a>
        <div className="nav">
          <span className="nav-item">
            <a className="nav-link" href="/" style={{ color: "white" }}>
              {" "}
              Set Location{" "}
            </a>
          </span>
          <button className="btn btn-danger" onClick={signOut}>
            Sign out
          </button>
        </div>
      </nav>
    );
  };


  return (
    <main className="App">
      {navbar()}
      <div className="content-area">
        <ListingLeft />
        <ListingRight />
      </div>
    </main>
  );
};

export default Layout;
