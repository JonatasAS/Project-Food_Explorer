import { Container, Content } from "./styles";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation }  from "swiper";

export function Carousel({ children }) {
  return (
    <Container>
      <Content>
        <Swiper
          grabCursor={true}
          loop={true}
          loopFillGroupWithBlank={true}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 11,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 19,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 37,
            },
            "@1.20": {
              slidesPerView: 4,
              spaceBetween: 134,
            },
          }}
          navigation={true}
          modules={[Navigation]}
          className="slidesWithSwiper"
        >
          <SwiperSlide>{children}</SwiperSlide>
        </Swiper>
      </Content>
    </Container>
  );
}
