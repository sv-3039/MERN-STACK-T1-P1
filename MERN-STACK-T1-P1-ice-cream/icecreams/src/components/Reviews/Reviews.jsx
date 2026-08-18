import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import { reviews } from '../../data/products';
import 'swiper/css';
import 'swiper/css/pagination';
import './reviews.css';

export default function Reviews() {
  return (
    <section className="section reviews-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Loved by Customers</span>
          <h2 className="section-title">What They're Saying</h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          spaceBetween={22}
          slidesPerView={1.1}
          breakpoints={{
            700: { slidesPerView: 2 },
            1080: { slidesPerView: 3 },
          }}
          className="reviews-swiper"
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.id}>
              <div className="review-card">
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} className={i < Math.round(r.rating) ? 'filled' : ''} />
                  ))}
                </div>
                <p className="review-comment">"{r.comment}"</p>
                <div className="review-user">
                  <img src={r.avatar} alt={r.name} />
                  <div>
                    <p className="review-name">{r.name}</p>
                    <p className="review-rating">{r.rating} rating</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
