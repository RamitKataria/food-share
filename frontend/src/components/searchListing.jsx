import React, {useEffect, useState} from "react";
import "../styles/listing.css";
import {getPosts} from "../redux/posts/service"

const ListingRight = () => {

  const [posts, setPosts] = useState([]);

  useEffect( async () => {
    const response = await getPosts();
    setPosts(response);

  }, []);

  const AccountInfo = {
    username: "username",
    logInId: "logInId",
    password: "password",
    address: "address",
    city: "city",
    state: "state",
    zip: "zip",
    phone: "phone",
    email: "email",
  };

  const listing = posts.map((item) => {
    return (
      <div className="listing">
        <div className="listing-header">
          <div className="listing-title">{item.title}</div>
          <div className="listing-location">{item.location}</div>
        </div>
        <div className="listing-body">
          <div className="listing-expirationDate">{item.expirationDate}</div>
          <div className="listing-quantity">{item.quantity}</div>
        </div>
        <div className="listing-footer">
          <div className="listing-description">{item.description}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="createSearch">
        <div
          className="grow search">
          <h3>Listings</h3>
          <div className="box">
            <div className="box-content">
              <div className="box-header">
                  {listing}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingRight;
