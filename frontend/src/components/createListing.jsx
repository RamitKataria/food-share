import React, { useState } from "react";
import "../styles/listing.css";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import {addPost} from "../redux/posts/service.js"

const ListingLeft = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const [grow, setGrow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [radius, setRadius] = useState(0);
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

const handleCreateMeeting = async (event) => {
    event.preventDefault();
    // this is how i should access the valus later.
    await addPost({
      title: event.target.title.value,
      location: event.target.location.value,
      expirationDate: event.target.expirationDate.value,
      quantity: event.target.quantity.value,
      description: event.target.description.value
    }).then(() => {
      // toast("👤 Account Updated!");
    }).catch((error) => {
      // toast("👤 ERR! Account NOT Updated!");
    });
  };


const ModalItem = () => {
  return (
    <Modal 
      show={isBoxVisible}
      onHide={() => setIsBoxVisible(false)}
      size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
        <strong>Create Listing</strong>
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>

    <Form>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" placeholder="Title"/>
    </Form.Group>
  </Row>
  <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Location</Form.Label>
      <Form.Control type="text" placeholder="Location"/>
    </Form.Group>
    </Row>



  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control type="text" placeholder="Quantity" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Expiration Date</Form.Label>
    <Form.Control type="text" placeholder="Expiration Date" />
    </Form.Group>

  </Row>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows={15}placeholder="Description"/>
    </Form.Group>
  </Row>
    
      </Form>
  </Modal.Body>
  <Modal.Footer>
  {showAlert?<Alert key='success' variant='success'> Listing Posted! </Alert>:null}
  <Button onClick={handleCreateMeeting}>Create Listing</Button>
  </Modal.Footer>
</Modal>
);
}


  return (
    <>
      <div className="leftbar">
        <ModalItem/>
        <div
          className={`${grow ? "grow" : ""} create`}
          onClick={() => setIsBoxVisible(true)}
        >
          <h3>Create Listing</h3>

        </div>
        <div
          className={`${grow ? "" : "grow"} search`}
          onClick={() => setGrow(false)}
        >
          <h3>Search</h3>
          <div className={`${grow ? "hidden" : "box"}`}>
            <div className="box-content">
              <div className="box-header">
                <div className="box-close" onClick={() => setGrow(!grow)}>
                <Form>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Keyword</Form.Label>
      <Form.Control type="text" placeholder="Chips, broccoli,..."/>
    </Form.Group>
  </Row>
  <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Postal Code</Form.Label>
      <Form.Control type="text" placeholder="Postal Code"/>

    </Form.Group>
    
    </Row>
    <Button variant="primary" type="submit">Current Location</Button>
    <br/>
    <br/>

    <Form.Label>Radius {radius} km</Form.Label>
      <Form.Range 
      defaultValue={0}
      onChange={(e) => setRadius(e.target.value)}
      max={50}
      />


  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control type="text" placeholder="Quantity" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Expiration Date</Form.Label>
    <Form.Control type="text" placeholder="Expiration Date" />
    </Form.Group>

  </Row>

    
      </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingLeft;
