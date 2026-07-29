import React, { useState } from "react";
import BookCard from "../components/BookCard";
import booksData from "../data/books";

function Home({ search }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search?.toLowerCase() || "");

    const matchesCategory =
      selectedCategory === "All" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Available Books</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        {["All", "Fiction", "Self Help", "Business"].map((category) => (
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

      <div className="row">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;