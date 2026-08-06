import SimpleProductGrid from '../common/SimpleProductGrid';
import { useProducts } from '../../context/ProductContext';

export default function Gelato() {
  const { products } = useProducts();
  const items = products.filter((p) => p.category === 'gelato');

  return (
    <SimpleProductGrid
      eyebrow="Italian Craft"
      title="Gelato"
      sub="Denser, silkier, and bursting with intense flavour."
      items={items}
      bg
    />
  );
}
