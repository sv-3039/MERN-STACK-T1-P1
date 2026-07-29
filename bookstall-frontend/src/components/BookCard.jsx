import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function BookCard({ book }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow shadow-sm">

        <img
          src={book.image}
          alt={book.title}
          className="card-img-top"
          style={{
            height: "300px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title fw-bold">
            {book.title}
          </h5>

          <p className="mb-1">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="mb-2">
            <strong>Category:</strong> {book.category}
          </p>

          <h4 className="text-success">
            ₹{book.price}
          </h4>

          <div className="mt-auto">

            <Link
              to={`/book/${book.id}`}
              className="btn btn-primary w-100 mb-2"
            >
              View Details
            </Link>

            <button
              className="btn btn-success w-100 mb-2"
              onClick={() => addToCart(book)}
            >
              <FaShoppingCart className="me-2" />
              Add to Cart
            </button>

            <button
              className="btn btn-danger w-100"
              onClick={() => addToWishlist(book)}
            >
              <FaHeart className="me-2" />
              Add to Wishlist
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default BookCard;