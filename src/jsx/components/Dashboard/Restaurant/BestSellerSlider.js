import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import "swiper/css";

const BestSellerSlider = ({ items }) => {
  return (
    <>
      <Swiper
        className="mySwiper-6"
        //speed= {1200}
        slidesPerView={5}
        spaceBetween={30}
        //loop={true}
        // autoplay= {{
        //    delay: 1200,
        // }}
        modules={[Autoplay]}
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1480: {
            slidesPerView: 5,
            spaceBetween: 20,
          },

          1600: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="card dishe-bx b-hover review menu-bx"
              style={{ height: 200, justifyContent: "end" }}
            >
              <div className="card-body text-center py-3">
                {item.image ? (
                  <img
                    className="text-truncate"
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i
                    className="bi bi-image-fill"
                    style={{
                      fontSize: "60px",
                      display: "block",
                      textAlign: "center",
                      lineHeight: "60px",
                      color: "#ccc",
                      paddingRight: "8px",
                    }}
                    title={item.name}
                  ></i>
                )}
              </div>
              <div className="card-footer pt-0 border-0 text-center">
                <div>
                  <Link to={"#"}>
                    <h4 className="mb-0">{item.name}</h4>
                  </Link>
                  <h3 className="font-w700 text-primary mb-0">
                    R$ {parseFloat(item.price).toFixed(2)}
                  </h3>
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      class="bi bi-circle-fill"
                      style={{
                        color: item.available ? "green" : "red",
                      }}
                    ></i>
                    <p className="mb-0 px-2">
                      {item.available ? "Disponível" : "Indisponível"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default BestSellerSlider;
