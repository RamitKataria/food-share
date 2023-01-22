import React, { useState } from "react";
import "../styles/listing.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

const ListingRight = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    id: "",
    image: "",
    title: "",
    location: "",
    expirationDate: "",
    quantity: "",
    description: "",
  });

  const array = [
    {
      id: 1,
      title: "Title1",
      location: "Location1",
      expirationDate: "Expiration Date1",
      quantity: "Quantity1",
      description: "Description1",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      title: "Title2",
      location: "Location2",
      expirationDate: "Expiration Date2",
      quantity: "Quantity2",
      description: "Description2",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Title3",
      location: "Location3",
      expirationDate: "Expiration Date3",
      quantity: "Quantity3",
      description: "Description3",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "Title3",
      location: "Location3",
      expirationDate: "Expiration Date3",
      quantity: "Quantity3",
      description: "Description3",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      title: "Title3",
      location: "Location3",
      expirationDate: "Expiration Date3",
      quantity: "Quantity3",
      description: "Description3",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 6,
      title: "Title3",
      location: "Location3",
      expirationDate: "Expiration Date3",
      quantity: "Quantity3",
      description: "Description3",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 7,
      title: "Title3",
      location: "Location3",
      expirationDate: "Expiration Date3",
      quantity: "Quantity3",
      description: "Description3",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 8,
      title: "Title3",
      location: "Location3",
      expirationDate: "Expiration Date3",
      quantity: "Quantity3",
      description: "Description3",
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const listing = array.map((item) => {
    return (
      <Card key={item.id} style={{ width: "12rem", margin: "10px" }}>
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
            <strong>{item.location}</strong> <br/>
            {item.description}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              setIsBoxVisible(true);
              setModalInfo({
                id: item.id,
                image: item.image,
                title: item.title,
                location: item.location,
                expirationDate: item.expirationDate,
                quantity: item.quantity,
                description: item.description,
              });
            }}
          >
            More Info
          </Button>
        </Card.Body>
      </Card>
    );
  });

  const ModalItem = () => {
    return (
      <Modal
        show={isBoxVisible}
        onHide={() => setIsBoxVisible(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ width: "100vw", position: "absolute" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong>
              {modalInfo.title} (#{modalInfo.id})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="moreinfo">
            <img
              src={modalInfo.image}
              alt="item"
              style={{ width: "50%", marginRight: "10px" }}
            />
            <div>
              <strong>Location:</strong> {modalInfo.location}
              <br />
              <strong>Expiration Date:</strong> {modalInfo.expirationDate}
              <br />
              <strong>Quantity:</strong> {modalInfo.quantity}
              <br />
              <strong>Description:</strong> {modalInfo.description}
              <br />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Form>
            <Form.Group>
              <Row>
                <Col>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Send a Message"
                  name="message"
                  style={{ width: "300px" }}
                />
                </Col>
                <Col>
                <Button variant="primary" type="submit">
                  Send
                </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <div className="createSearch">
        <div className="grow search">
          <h3>Listings</h3>
          <div className="box-content">
            <ModalItem />
            {listing}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingRight;
