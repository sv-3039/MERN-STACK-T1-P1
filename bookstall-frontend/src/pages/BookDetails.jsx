import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import books from "../data/books";

function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="container mt-5 text-center">
        <h2>Book Not Found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Book Image */}
        <div className="col-md-5 text-center">
          <img
            src={book.image}
            alt={book.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px" }}
          />
        </div>

        {/* Book Details */}
        <div className="col-md-7">
          <h2>{book.title}</h2>

          <h5 className="text-secondary">
            Author: {book.author}
          </h5>

          <h5>
            Category: {book.category}
          </h5>

          <h3 className="text-success mt-3">
            ₹{book.price}
          </h3>

          <p className="mt-4">
            This is one of the most popular books in our collection.
            It is highly recommended for readers interested in{" "}
            <strong>{book.category}</strong>.
          </p>

          <button
            className="btn btn-success me-3"
            onClick={() => addToCart(book)}
          >
            Add To Cart
          </button>

          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;