import SimpleProductGrid from '../common/SimpleProductGrid';
import { milkshakes } from '../../data/products';

export default function Milkshakes() {
  return (
    <SimpleProductGrid
      eyebrow="Sip Something Sweet"
      title="Milkshakes"
      sub="Thick, creamy shakes blended fresh to order."
      items={milkshakes}
      bg
    />
  );
}
