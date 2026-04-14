import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaTimes,
  FaHome,
  FaUtensils,
  FaClipboardList,
} from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart = [] } = useContext(CartContext) || {};

  const cartCount = cart.reduce((acc, item) => acc + (item.qty || 0), 0);

  useEffect(() => {
    document.body.classList.toggle("sidebar-open", isOpen);
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <button className="menu-icon" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>

          <div>
            <h2 className="logo">Campus Canteen</h2>
            <p className="greet">Good Morning, tanvi27 👋</p>
          </div>
        </div>

        {/* ONLY ICON ROW */}
        <div className="nav-right">
          <button className="icon-btn">
            <FaSearch />
          </button>

          <Link to="/cart" className="icon-btn">
            <FaShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          <button className="icon-btn">
            <FaBell />
          </button>

          <div className="profile-btn">T</div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>

        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}><FaHome /> Home</Link></li>
          <li><Link to="/menu" onClick={() => setIsOpen(false)}><FaUtensils /> Menu</Link></li>
          <li><Link to="/cart" onClick={() => setIsOpen(false)}><FaShoppingCart /> Cart</Link></li>
          <li><Link to="/orders" onClick={() => setIsOpen(false)}><FaClipboardList /> Orders</Link></li>
        </ul>
      </div>

      {/* OVERLAY */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}

export default Navbar;