import SimpleProductGrid from '../common/SimpleProductGrid';
import { gelato } from '../../data/products';

export default function Gelato() {
  return (
    <SimpleProductGrid
      eyebrow="Italian Craft"
      title="Gelato"
      sub="Denser, silkier, and bursting with intense flavour."
      items={gelato}
      bg
    />
  );
}
