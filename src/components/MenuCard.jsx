import { useState } from "react";

function MenuCard({ item, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(item);
    setAdded(true);

    // optional: reset after 1.5 sec
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.desc}</p>
      <p>₹{item.price}</p>

      <button
        onClick={handleClick}
        style={{
          background: added ? "orange" : "green",
        }}
      >
        {added ? "Added ✓" : "ADD"}
      </button>
    </div>
  );
}

export default MenuCard;