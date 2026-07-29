import SimpleProductGrid from '../common/SimpleProductGrid';
import { familyPacks } from '../../data/products';

export default function FamilyPacks() {
  return (
    <SimpleProductGrid
      eyebrow="For the Whole Family"
      title="Family Packs"
      sub="Big tubs, bigger smiles — perfect for movie nights and celebrations."
      items={familyPacks}
      bg
    />
  );
}
