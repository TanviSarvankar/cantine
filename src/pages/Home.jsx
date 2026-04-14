import { useState, useEffect } from "react";
import "../styles/home.css";
import { 
  FaHome, 
  FaList, 
  FaShoppingBag, 
  FaUser, 
  FaInfoCircle, 
  FaPhone, 
  FaFileAlt, 
  FaQuestionCircle 
} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔍 SEARCH
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // 🛒 CART
  const [cart, setCart] = useState([]);

  // 🎯 FILTER
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [rating, setRating] = useState(null);
  const [prepTime, setPrepTime] = useState(null);

  const categories = ["All", "Lunch", "Snacks", "Breakfast"];

  const items = [
    { id: 1, name: "Veg Biryani", price: 80, category:"Lunch", rating: 4.5, time: 15, image: "https://tse2.mm.bing.net/th/id/OIP.Vjw4yJSpw3yeD_2RhCLZpgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 2, name: "Paneer Wrap", price: 60, category:"Lunch", rating: 4, time: 10, image: "https://images.herzindagi.info/image/2019/Nov/how-to-make-paneer-wrap-recipe-two.jpg" },
    { id: 3, name: "Masala Dosa", price: 50, category:"Breakfast", rating: 4.2, time: 10, image: "https://png.pngtree.com/png-vector/20250416/ourmid/pngtree-masala-dosa-with-chutneys-appealing-south-indian-breakfast-png-image_16032369.png" },
    { id: 4, name: "Vada Pav", price: 30, category:"Snacks", rating: 3.8, time: 5, image: "https://wallpapercave.com/wp/wp8981219.jpg" },
    { id: 5, name: "Chai", price: 10, category:"Snacks", rating: 4.8, time: 5, image: "https://static.vecteezy.com/system/resources/thumbnails/030/708/178/small_2x/of-a-spiced-chai-tea-isolated-on-flat-black-background-generative-ai-photo.jpg" },
    { id: 6, name: "Chicken Biryani", price: 200, category:"Lunch", rating: 4.8, time: 15, image:"https://i.pinimg.com/1200x/6a/cc/f3/6accf3cefbe7f9779d151e3696018990.jpg"},
  ];

  // 🛒 ADD TO CART
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  // 💾 SAVE CART
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (data) setCart(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔍 + 🎯 FILTER LOGIC
  const filteredItems = items
  .filter((item) =>
    selectedCategory === "All"
      ? true
      : item.category.toLowerCase() === selectedCategory.toLowerCase()
  )
  .filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  )
  .filter((item) => item.price >= minPrice && item.price <= maxPrice)
  .filter((item) => (rating ? item.rating >= rating : true))
  .filter((item) => (prepTime ? item.time <= prepTime : true));
  return (
    <div className="home">

      {/* SIDEBAR */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>

        {/* TOP */}
        <div className="sidebar-top">
          <div className="profile-icon">
             <FaUserCircle />
          </div>
          <div>
            <h4>Login / Sign Up</h4>
            <p>Access your account</p>
          </div>
        </div>

        {/* MENU */}
        <ul className="menu">
  <li className="active">
    <span><FaHome /> Home</span>
    <span>›</span>
  </li>

  <li>
    <span><FaList /> Browse Menu</span>
    <span>›</span>
  </li>

  <li>
    <span><FaShoppingBag /> My Orders</span>
    <span>›</span>
  </li>

  <li>
    <span><FaUser /> Profile</span>
    <span>›</span>
  </li>
</ul>

        {/* INFO */}
        <div className="info-section">
  <p>INFORMATION</p>

  <li><span><FaInfoCircle /> About Us</span><span>›</span></li>
  <li><span><FaPhone /> Contact Us</span><span>›</span></li>
  <li><span><FaFileAlt /> Terms & Conditions</span><span>›</span></li>
  <li><span><FaQuestionCircle /> Help & Support</span><span>›</span></li>
</div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* HEADER */}
      <div className="header">
       <span className="icon" onClick={() => setMenuOpen(!menuOpen)}>
         {menuOpen ? "✖" : "☰"}
       </span>

        <h2>Campus Canteen</h2>

        <div className="header-icons">
          <span className="icon" onClick={() => setSearchOpen(!searchOpen)}>🔍</span>

          <div className="icon badge">
            🛒
            <span>{cart.reduce((t, i) => t + i.qty, 0)}</span>
          </div>

          <span className="icon" onClick={() => setMenuOpen(true)}>
  👤
</span>
        </div>
      </div>

      {/* SEARCH */}
      <div className={`search-bar ${searchOpen ? "show" : ""}`}>
        <input
          type="text"
          placeholder="Search food..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* CATEGORIES */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}

        <div className="filter-btn" onClick={() => setFilterOpen(true)}>
          ⚙️
        </div>
      </div>

      {/* ITEMS */}
      <div className="section">
        <h3>Popular Items</h3>

        <div className="grid">
          {filteredItems.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="card-body">
                <h4>{item.name}</h4>
                <p>⭐ {item.rating} • ⏱ {item.time} min</p>

                <div className="card-bottom">
                  <span>₹{item.price}</span>
                  <button onClick={() => handleAddToCart(item)}>
                    {cart.find((i) => i.id === item.id) ? "ADDED" : "ADD"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER */}
      {filterOpen && (
        <div className="filter-overlay">
          <div className="filter-box">

            <div className="filter-header">
              <h3>Filter Items</h3>
              <span onClick={() => setFilterOpen(false)}>✖</span>
            </div>

            <h4>₹ Price Range</h4>
            <p>Min: ₹{minPrice}</p>
            <input type="range" min="0" max="100" value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))} />

            <p>Max: ₹{maxPrice}</p>
            <input type="range" min="0" max="100" value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))} />

            <h4>⭐ Rating</h4>
            <div className="filter-options">
              {[3, 3.5, 4, 4.5, 5].map((r) => (
                <button key={r}
                  className={rating === r ? "active" : ""}
                  onClick={() => setRating(r)}>
                  ⭐ {r}+
                </button>
              ))}
            </div>

            <h4>⏱ Time</h4>
            <div className="filter-options">
              {[10, 15, 20, 25, 30].map((t) => (
                <button key={t}
                  className={prepTime === t ? "active" : ""}
                  onClick={() => setPrepTime(t)}>
                  {t} min
                </button>
              ))}
            </div>

            <div className="filter-actions">
              <button onClick={() => {
                setMinPrice(0);
                setMaxPrice(100);
                setRating(null);
                setPrepTime(null);
              }}>
                Reset All
              </button>

              <button onClick={() => setFilterOpen(false)}>
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}