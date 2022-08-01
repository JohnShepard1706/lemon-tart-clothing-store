import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewModal from "../Modal/ViewModal";
import LoadingSpinner from "../UI/LoadingSpinner";
function HotItems() {
  const [loading, setLoading] = useState(true);
  const [hotItems, setHotItems] = useState([]);

  const fetchHotItems = async () => {
    setLoading(true);
    const response = await fetch(
      "https://lemontart-store-default-rtdb.firebaseio.com/hotItems.json"
    );
    const responseData = await response.json();
    const transformedData = Object.values(responseData);
    setHotItems(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchHotItems();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <Row xs={1} md={2} lg={4} className="g-4">
        {hotItems.map((items) => (
          <Col>
            <Card>
              <div>
                <ViewModal
                  title={items.title}
                  link={items.link}
                  desc={items.desc}
                  price={items.price}
                ></ViewModal>
                <Card.Img variant="top" src={items.link} />
              </div>
              <Card.Body>
                <Link to={`/products/hotItems/${items.title}`}>
                  <Card.Title>{items.title}</Card.Title>
                </Link>
                <Card.Text>{items.desc}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Rs. {items.price}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
}
export default HotItems;
