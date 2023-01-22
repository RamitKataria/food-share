import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/layout.css'
import user from '../styles/user.png'
import '../styles/search.css';
import ListingLeft from "./createListing";
import ListingRight from "./searchListing";

const Layout = () => {

    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();

    const signOut = async () => {
      navigate("/login");
    };

const navbar = ()=>{
    return (
      <nav className="navbar navbar-dark bg-dark justify-content-between navbar-head">
          <a className="navbar-brand"> <h1>Ultimate App</h1> </a>
          <div className="nav" >
              <span className="nav-item" >
                  <a className="nav-link" href="/" style={{"color":"white"}}> Set Location </a>
              </span>
              {/* <span className="nav-item">
                  <a className="nav-link" href="/cart" style={{"color":"white"}}> Cart </a>
              </span>
              <span className="nav-item">
                  <a className="nav-link" href="/history" style={{"color":"white"}}> Search History </a>
              </span> */}
              <button className="btn btn-danger" onClick={signOut}>
                  Sign out
              </button>
          </div>
      </nav>
    );
}

const sidebar = ()=>{
    return (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
        style={{"width": "280px"}}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Main Page</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {/* <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Filters
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <input type="checkbox"></input>Order by AI Sentiment Score
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Filter by price : <input type="text"></input>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Sort by Rating
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Sort by Sentiment Analysis
            </a>
          </li> */}
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                Delete Account
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Update Account
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }


    return (
    <main className="App">
        {navbar()}
        <div className="content-area">
            {/* {sidebar()} */}
            <ListingLeft />
            
            <div className="search-area">
              <ListingRight/>
            </div>
        </div>
    </main>
  );
};

export default Layout;
