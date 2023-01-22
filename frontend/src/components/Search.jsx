import { useNavigate, Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/search.css";
import user from "../styles/user.png";
import { useState } from "react";

const Search = () => {
  const SEARCH_URL = "/products";
  const navigate = useNavigate();


  const [maxPrice, setMaxPrice] = useState("");
  const [orderCheck, setOrderCheck] = useState(false);  
  const [topProducts, setTopProducts] = useState("");
  const [searchID, setSearchID] = useState("");
  const [resdata, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleDel, setToggleDel] = useState(false);

  const [accInfo, setAccInfo] = useState({});
  const [disableFilter, setDisableFilter] = useState(true);

  const getAccInfo = async (username) => {
    // var info = await axios.get("/edit", {
    //   params: {
    //     username: username
    //   }
    // });
    setAccInfo(info.data);
  }
  


  const signOut = async () => {
    navigate("/login");
  };
  



  



  return (

      <div className="search-area">
          hello world
      </div>
  );
};

export default Search;
