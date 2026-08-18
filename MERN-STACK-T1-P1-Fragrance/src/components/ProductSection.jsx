import ProductCard from "./ProductCard";

function ProductSection({ id, title, products, addToCart }) {
  return (
    <section id={id}>
      <h2>{title}</h2>

      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;