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
    <div className="container my-5">

      <div className="card shadow-lg border-0 rounded-4 p-4">

        <div className="row">

          {/* Left Side - Book Image */}

          <div className="col-md-4 text-center">

            <img
              src={book.image}
              alt={book.title}
              className="img-fluid rounded shadow"
              style={{
                maxHeight: "520px",
                objectFit: "cover",
              }}
            />

          </div>

          {/* Right Side - Details */}

          <div className="col-md-8">

            <h1 className="fw-bold">
              {book.title}
            </h1>

            <h4 className="text-secondary mb-3">
              by {book.author}
            </h4>

            <span className="badge bg-primary fs-6 me-2">
              {book.category}
            </span>

            <span className="badge bg-warning text-dark fs-6">
              ⭐ {book.rating}/5
            </span>

            <h2 className="text-success mt-4">
              ₹{book.price}
            </h2>

            <hr />

            {/* Summary */}

            <h4 className="fw-bold mb-3">
              📖 Summary
            </h4>

            <p
              className="text-muted"
              style={{
                textAlign: "justify",
                lineHeight: "1.8",
                fontSize: "16px",
              }}
            >
              {book.summary}
            </p>

            <hr />

            {/* Book Details */}

            <h4 className="fw-bold mb-3">
              📄 Book Details
            </h4>

            <div className="row">

              <div className="col-md-6">

                <p>
                  <strong>Language:</strong> {book.language}
                </p>

                <p>
                  <strong>Pages:</strong> {book.pages}
                </p>

                <p>
                  <strong>Publisher:</strong> {book.publisher}
                </p>

                <p>
                  <strong>Published:</strong> {book.published}
                </p>

              </div>

              <div className="col-md-6">

                <p>
                  <strong>ISBN:</strong> {book.isbn}
                </p>

                <p>
                  <strong>Availability:</strong>

                  <span className="badge bg-success ms-2">
                    {book.stock}
                  </span>
                </p>

              </div>

            </div>

            <hr />

            {/* Reviews */}

            <h4 className="fw-bold mb-3">
              💬 Reader Reviews
            </h4>

            <ul className="list-group mb-4">

              {book.reviews &&
                book.reviews.map((review, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                  >
                    ⭐ {review}
                  </li>
                ))}

            </ul>

            {/* Buttons */}

            <button
              className="btn btn-success btn-lg me-3"
              onClick={() => addToCart(book)}
            >
              🛒 Add To Cart
            </button>

            <Link
              to="/"
              className="btn btn-outline-secondary btn-lg"
            >
              ⬅ Back
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;