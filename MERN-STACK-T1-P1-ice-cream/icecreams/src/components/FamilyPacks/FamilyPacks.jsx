import SimpleProductGrid from '../common/SimpleProductGrid';
import { useProducts } from '../../context/ProductContext';

export default function FamilyPacks() {
  const { products } = useProducts();
  const items = products.filter((p) => p.category === 'family-packs');

  return (
    <SimpleProductGrid
      eyebrow="For the Whole Family"
      title="Family Packs"
      sub="Big tubs, bigger smiles — perfect for movie nights and celebrations."
      items={items}
      bg
    />
  );
}
