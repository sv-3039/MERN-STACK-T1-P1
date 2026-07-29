import SimpleProductGrid from '../common/SimpleProductGrid';
import { kulfi } from '../../data/products';

export default function Kulfi() {
  return (
    <SimpleProductGrid
      eyebrow="Traditional Favourite"
      title="Kulfi"
      sub="Rich, slow-churned kulfi made the authentic way."
      items={kulfi}
    />
  );
}
