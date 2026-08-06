import SimpleProductGrid from '../common/SimpleProductGrid';
import { useProducts } from '../../context/ProductContext';

export default function Milkshakes() {
  const { products } = useProducts();
  const items = products.filter((p) => p.category === 'milkshakes');

  return (
    <SimpleProductGrid
      eyebrow="Sip Something Sweet"
      title="Milkshakes"
      sub="Thick, creamy shakes blended fresh to order."
      items={items}
      bg
    />
  );
}
