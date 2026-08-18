import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="container mt-5">
      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No books in wishlist.</p>
      ) : (
        wishlist.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))
      )}
    </div>
  );
}

export default Wishlist;