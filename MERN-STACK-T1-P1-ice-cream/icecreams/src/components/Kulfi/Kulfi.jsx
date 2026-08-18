import SimpleProductGrid from '../common/SimpleProductGrid';
import { useProducts } from '../../context/ProductContext';

export default function Kulfi() {
  const { products } = useProducts();
  const items = products.filter((p) => p.category === 'kulfi');

  return (
    <SimpleProductGrid
      eyebrow="Traditional Favourite"
      title="Kulfi"
      sub="Rich, slow-churned kulfi made the authentic way."
      items={items}
    />
  );
}
