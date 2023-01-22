import React, { useState } from "react";
import "../styles/listing.css";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

const ListingRight = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const [grow, setGrow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const array = [{
    title: "Title1",
    location: "Location1",
    expirationDate: "Expiration Date1",
    quantity: "Quantity1",
    description: "Description1"
  },
  {
    title: "Title2",
    location: "Location2",
    expirationDate: "Expiration Date2",
    quantity: "Quantity2",
    description: "Description2"
  },
  {
    title: "Title3",
    location: "Location3",
    expirationDate: "Expiration Date3",
    quantity: "Quantity3",
    description: "Description3"
  }
]

const AccountInfo = {
  username: "username",
  logInId: "logInId",
  password: "password",
  address: "address",
  city: "city",
  state: "state",
  zip: "zip",
  phone: "phone",
  email: "email"
}



  const listing = array.map((item) => {
        return (
          <div className="listing">
            <div className="listing-header">
              <div className="listing-title">
                {item.title}
              </div>
              <div className="listing-location">
                {item.location}
              </div>
            </div>
            <div className="listing-body">
              <div className="listing-expirationDate">
                {item.expirationDate}
              </div>
              <div className="listing-quantity">
                {item.quantity}
              </div>
            </div>
            <div className="listing-footer">
              <div className="listing-description">
                {item.description}
              </div>
            </div>
          </div>
        );
      });

  return (
    <>
      <div className="createSearch">

        <div
          className={`${grow ? "" : "grow"} search`}
          onClick={() => setGrow(false)}
        >
          <h3>Listings</h3>
          <div className={`${grow ? "hidden" : "box"}`}>
            <div className="box-content">
              <div className="box-header">
                <div className="box-close" onClick={() => setGrow(!grow)}>
                  {listing}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingRight;
