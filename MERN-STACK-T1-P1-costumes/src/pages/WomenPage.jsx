import CollectionPage from "./CollectionPage";
import { WOMEN_PRODUCTS } from "../data/products";

export default function WomenPage() {
  return (
    <CollectionPage
      title="Women's Collection"
      subtitle="Western, ethnic, party and winter wear — designed for every mood and moment."
      products={WOMEN_PRODUCTS}
    />
  );
}
