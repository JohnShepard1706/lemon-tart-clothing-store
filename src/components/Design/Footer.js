import { Button } from "react-bootstrap";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="cpr">
        <p id="cpr">
          © Copyright 2021 <span id="title">Gecko</span> all rights reserved.
          Powered by The4
        </p>
      </div>
      <div className="search">
        <Button variant="dark">Search</Button>
      </div>
    </div>
  );
}
export default Footer;
