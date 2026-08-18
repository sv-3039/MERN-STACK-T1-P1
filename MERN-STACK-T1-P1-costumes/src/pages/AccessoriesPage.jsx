import CollectionPage from "./CollectionPage";
import { ACCESSORY_PRODUCTS } from "../data/products";

export default function AccessoriesPage() {
  return (
    <CollectionPage
      title="Fashion Accessories"
      subtitle="The finishing pieces — bags, jewellery, eyewear and more for men and women."
      products={ACCESSORY_PRODUCTS}
    />
  );
}
