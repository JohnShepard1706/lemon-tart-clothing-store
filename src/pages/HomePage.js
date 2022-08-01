import HotItems from "../components/Items/HotItems";
import OnSaleItems from "../components/Items/OnSaleItems";
import RecentItems from "../components/Items/RecentItems";
import { Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="main">
      <div className="heading">
        <h3>---- Top Sellers ----</h3>
        <p className="desc">This weeks best sellers</p>
      </div>
      <HotItems></HotItems>
      <div className="heading">
        <h3>---- On Sale ----</h3>
        <p className="desc">Our best value for money products.</p>
      </div>
      <OnSaleItems></OnSaleItems>
      <div className="heading">
        <h3>---- JUST ARRIVED ----</h3>
        <p className="desc">Recently Added products</p>
      </div>
      <RecentItems></RecentItems>
      <div className="more">
        <Button variant="outline-warning" id="more">
          LOAD MORE PRODUCTS
        </Button>
      </div>
    </div>
  );
};
export default HomePage;
