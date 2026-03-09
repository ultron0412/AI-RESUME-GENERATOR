import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="error-page">
        <div className="error-content glass fade-in">
          <HiOutlineMagnifyingGlass className="error-icon" />
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <div className="error-actions">
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
