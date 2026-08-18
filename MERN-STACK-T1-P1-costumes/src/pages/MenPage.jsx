import CollectionPage from "./CollectionPage";
import { MEN_PRODUCTS } from "../data/products";

export default function MenPage() {
  return (
    <CollectionPage
      title="Men's Collection"
      subtitle="Casual, formal, traditional and winter edits — cut for how you actually dress."
      products={MEN_PRODUCTS}
    />
  );
}
