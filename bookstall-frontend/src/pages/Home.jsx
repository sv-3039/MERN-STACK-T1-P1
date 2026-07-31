import React, { useState } from "react";
import BookCard from "../components/BookCard";
import booksData from "../data/books";

function Home({ search }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Fiction",
    "Self Help",
    "Business",
    "Romance",
    "Fantasy",
    "Horror",
    "Classic",
    "Mystery",
    "Non Fiction",
  ];

  const filteredBooks = booksData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">

      {/* Heading */}
      <h2 className="text-center fw-bold mb-3">
        📚 Explore Our Book Collection
      </h2>

      <p className="text-center text-muted mb-4">
        Discover your next favorite book from our collection.
      </p>

      {/* Categories */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mb-3">
        <h5 className="text-secondary">
          {filteredBooks.length} Book
          {filteredBooks.length !== 1 ? "s" : ""} Found
        </h5>
      </div>

      {/* Books */}
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="text-center mt-5">
            <h3>No books found 📖</h3>
            <p className="text-muted">
              Try searching with another title, author, or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;