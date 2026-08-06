import PageHeader from '../components/common/PageHeader';
import Brands from '../components/Brands/Brands';

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Trusted Partners"
        title="Iconic Brands"
        sub="Discover authentic ice cream flavours, sundaes, family tubs, and cones from India's 10 most loved ice cream brands."
      />
      <Brands />
    </>
  );
}

