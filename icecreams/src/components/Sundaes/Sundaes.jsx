import SimpleProductGrid from '../common/SimpleProductGrid';
import { sundaes } from '../../data/products';

export default function Sundaes() {
  return (
    <SimpleProductGrid
      eyebrow="Layered & Loaded"
      title="Sundaes"
      sub="Decadent layers of ice cream, sauces, and toppings."
      items={sundaes}
    />
  );
}
