import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Autoplay } from "swiper";
import "swiper/css";
import { useDispatch } from "react-redux";
import { redirectToMenuAction } from "../../../../store/actions/MenuActions";

const MenuPopularSlider = ({ menus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectToCategory = (menu) => {
    dispatch(redirectToMenuAction(menu))
    navigate("/menu/"+menu.menu_id);
  }

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.menu_id}>
          <div className="d-flex align-items-center justify-content-between mb-2 mt-sm-0 mt-3">
            <h5 className="mb-0 cate-title">{menu.menu_name}</h5>
            <span onClick={() => redirectToCategory(menu)} className="text-primary cursor-pointer">
              Ver tudo<i className="fa-solid fa-angle-right ms-2"></i>
            </span>
          </div>
          <Swiper
            className="mySwiper-3"
            slidesPerView={3}
            spaceBetween={20}
            modules={[Autoplay]}
            breakpoints={{
              360: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              600: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1480: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1920: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {menu.items.length ? menu.items.map((item) => (
              <SwiperSlide key={item.item_id}>
                <div className="card b-hover mb-2">
                  <div className="card-body p-3">
                    <div className="menu-bx">
                      <div className="d-flex align-items-start">
                        {item.image ? (
                          <img
                            className="text-truncate"
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              paddingRight: "8px",
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
                        <div className="mr-auto pr-3">
                          <Link to={"#"}>
                            <h4 className="font-w500">{item.name}</h4>
                          </Link>
                          <h4 className="text-primary">
                            R$ {parseFloat(item.price).toFixed(2)}
                          </h4>
                          <div className="d-flex align-items-center mb-3 text-nowrap">
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
                        <Dropdown className="dropdown ms-auto">
                          <Dropdown.Toggle
                            as="div"
                            className="btn-link i-false"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                stroke="#262626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
                                stroke="#262626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
                                stroke="#262626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <p className="mb-0 font-w400">
                        {item.description  ?? null}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )) : (
              <p className="mb-1">Essa categoria não há produtos vinculados.</p>
            )}
          </Swiper>
          <hr/>
        </div>
      ))}
    </>
  );
};

export default MenuPopularSlider;
