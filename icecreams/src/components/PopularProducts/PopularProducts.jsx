import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { products } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import './popularProducts.css';

export default function PopularProducts() {
  const popular = products.filter((p) => p.isBestseller).slice(0, 10);

  return (
    <section className="section popular-section">
      <div className="container">
        <div className="popular-head">
          <div>
            <span className="eyebrow">Fan Favourites</span>
            <h2 className="section-title">Popular Ice Creams</h2>
          </div>
          <Link to="/products" className="btn btn-outline">
            View All <FiArrowRight />
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          spaceBetween={20}
          slidesPerView={1.15}
          breakpoints={{
            560: { slidesPerView: 2.1 },
            860: { slidesPerView: 3.1 },
            1180: { slidesPerView: 4 },
          }}
          className="popular-swiper"
        >
          {popular.map((p, i) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
