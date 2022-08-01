import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewModal from "../Modal/ViewModal";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./RecentItems.css";
function RecentItems() {
  const [loading, setLoading] = useState(true);
  const [recentItems, setRecentItems] = useState([]);

  const fetchClothesHandler = async () => {
    setLoading(true);
    const response = await fetch(
      "https://fakestoreapi.com/products/category/women's%20clothing"
    );
    const data = await response.json();
    const transformedClothes = data.map((clothesData) => {
      return {
        key: clothesData.id,
        desc: clothesData.description,
        title: clothesData.title,
        price: 1000,
        link: clothesData.image,
      };
    });
    setRecentItems(transformedClothes);
    setLoading(false);
  };
  useEffect(() => {
    fetchClothesHandler();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {recentItems.map((items) => (
        <Col>
          <Card className="center">
            <div>
              <ViewModal
                title={items.title}
                link={items.link}
                desc={items.title}
                price={items.price}
              ></ViewModal>
              <Card.Img variant="top" className="pic" src={items.link} />
            </div>
            <Card.Body>
              <Link to={`/products/recentItems/${items.title}`}>
                <Card.Title>{items.title}</Card.Title>
              </Link>
              <div className="descr">
                <Card.Text>{items.desc}</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Rs. {items.price}</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
export default RecentItems;
