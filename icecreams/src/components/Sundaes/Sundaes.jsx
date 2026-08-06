import SimpleProductGrid from '../common/SimpleProductGrid';
import { useProducts } from '../../context/ProductContext';

export default function Sundaes() {
  const { products } = useProducts();
  const items = products.filter((p) => p.category === 'sundaes');

  return (
    <SimpleProductGrid
      eyebrow="Layered & Loaded"
      title="Sundaes"
      sub="Decadent layers of ice cream, sauces, and toppings."
      items={items}
    />
  );
}
