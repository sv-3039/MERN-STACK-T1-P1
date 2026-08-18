import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import PopularProducts from '../components/PopularProducts/PopularProducts';
import Offers from '../components/Offers/Offers';
import ComboOffers from '../components/ComboOffers/ComboOffers';
import FamilyPacks from '../components/FamilyPacks/FamilyPacks';
import Sundaes from '../components/Sundaes/Sundaes';
import Gelato from '../components/Gelato/Gelato';
import Kulfi from '../components/Kulfi/Kulfi';
import Milkshakes from '../components/Milkshakes/Milkshakes';
import PremiumCollection from '../components/PremiumCollection/PremiumCollection';
import Brands from '../components/Brands/Brands';
import Reviews from '../components/Reviews/Reviews';
import FAQ from '../components/FAQ/FAQ';
import Newsletter from '../components/Newsletter/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularProducts />
      <Offers />
      <ComboOffers />
      <FamilyPacks />
      <Sundaes />
      <Gelato />
      <Kulfi />
      <Milkshakes />
      <PremiumCollection />
      <Brands />
      <Reviews />
      <FAQ />
      <Newsletter />
    </>
  );
}
