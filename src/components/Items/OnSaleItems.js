import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import ViewModal from "../Modal/ViewModal";
import "./OnSaleItems.css";
function OnSaleItems() {
  const [loading, setLoading] = useState(true);
  const [onSale, setOnSale] = useState([]);

  const fetchOnSaleItems = async () => {
    setLoading(true);
    const response = await fetch(
      "https://lemontart-store-default-rtdb.firebaseio.com/onSale.json"
    );
    const responseData = await response.json();
    const transformedData = Object.values(responseData);
    setOnSale(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchOnSaleItems();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {onSale.map((items) => (
        <Col>
          <Card>
            <div className="image">
              <ViewModal
                title={items.title}
                link={items.link}
                desc={items.desc}
                price={items.price}
              ></ViewModal>
              <Card.Img variant="top" src={items.link} />
              <div className="badge-overlay">
                <span className="top-right badge red">Sale</span>
              </div>
            </div>
            <Card.Body>
              <Link to={`/products/onSale/${items.title}`}>
                <Card.Title>{items.title}</Card.Title>
              </Link>
              <Card.Text>{items.desc}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                <span id="redprice">Rs. {items.redprice}</span>
                <span id="price">Rs. {items.price}</span>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
export default React.memo(OnSaleItems);
