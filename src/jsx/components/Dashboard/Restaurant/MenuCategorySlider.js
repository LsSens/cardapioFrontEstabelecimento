import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import { Dropdown } from "react-bootstrap";
import Alert from "sweetalert2";
import {
  deleteMenu,
  editMenu,
  getMenus,
} from "../../../../services/MenuService";

const MenuCategorySlider = ({ menus, setMenus, setLoading }) => {
  const handleEdit = (menu) => {
    Alert.fire({
      title: "Editar Menu",
      html: `${menu.menu_image ? `
              <div class="mt-3 text-center">
                <img src="${menu.menu_image}" alt="Pré-visualização" style="max-height: 130px" />
              </div>`
            : "" }`,
      input: "text",
      inputLabel: "Nome do Menu",
      inputValue: menu.menu_name,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: (inputValue) => {
        const updatedName = inputValue.trim();
        if (!updatedName) {
          Alert.showValidationMessage("O nome do menu não pode estar vazio.");
          return false;
        }
        if (updatedName === menu.menu_name) {
          Alert.showValidationMessage("O nome do menu não foi alterado.");
          return false;
        }
        return updatedName;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const updatedName = result.value;
        await editMenu(menu.menu_id, updatedName);
        getMenus().then(async (response) => {
          setMenus(response.data);
        });
        Alert.fire("Salvo!", "O nome do menu foi atualizado.", "success");
        setLoading(false);
      }
    });
  };

  const handleDelete = (menu) => {
    Alert.fire({
      title: "Tem certeza?",
      text: `Deseja apagar o menu "${menu.menu_name}"?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Sim, apagar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        await deleteMenu(menu.menu_id);
        getMenus().then(async (response) => {
          setMenus(response.data);
        });
        Alert.fire("Apagado!", "O menu foi removido.", "success");
        setLoading(false);
      }
    });
  };
  return (
    <Swiper
      className="mySwiper-2"
      slidesPerView={3}
      spaceBetween={20}
      loop={false}
      loopAdditionalSlides={0}
      modules={[Autoplay]}
      breakpoints={{
        360: { slidesPerView: 2, spaceBetween: 20 },
        600: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
        1200: { slidesPerView: 6, spaceBetween: 20 },
      }}
    >
      {menus.map((menu) => (
        <SwiperSlide key={menu.menu_id}>
          <div className="cate-bx text-center position-relative">
            <div className="card">
              <div className="card-body">
                <Dropdown
                  className="dropdown position-absolute top-0 end-0"
                  style={{ marginRight: 8 }}
                >
                  <Dropdown.Toggle as="div" className="btn-link i-false">
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
                  <Dropdown.Menu
                    align="end"
                    style={{ transform: "translate(0px, 20px) !important" }}
                  >
                    <Dropdown.Item onClick={() => handleEdit(menu)}>
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(menu)}>
                      Deletar
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {menu.menu_image ? (
                  <img
                    className="text-truncate"
                    src={menu.menu_image}
                    alt={menu.menu_name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i
                    className="bi bi-image-fill"
                    style={{
                      fontSize: "80px",
                      display: "block",
                      textAlign: "center",
                      lineHeight: "80px",
                      color: "#ccc",
                    }}
                    title={menu.menu_name}
                  ></i>
                )}
                <h6
                  className="mb-0 font-w500 text-truncate text-capitalize"
                  title={menu.menu_name}
                >
                  {menu.menu_name}
                </h6>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MenuCategorySlider;
