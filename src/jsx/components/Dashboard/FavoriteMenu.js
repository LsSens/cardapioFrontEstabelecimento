import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, Button } from "react-bootstrap";

import MenuList from "./Favorite/MenuList";
import { getMenuItemsById } from "./../../../services/MenuService";
import Skeleton from "react-loading-skeleton";
import { useRef } from "react";
import { ProductsModal } from "./ProductsModal";

const FavoriteMenu = () => {
  const [menuItems, setMenuItems] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [openProductsModal, setOpenProductsModal] = useState(false);
  const requestInProgress = useRef(false);
  const { id } = useParams();

  const handleOpenProductsModal = () => setOpenProductsModal(!openProductsModal)

  const getProductsById = async () => {
    setLoading(true);
    if (requestInProgress.current) return;
    requestInProgress.current = true;
    await getMenuItemsById(id)
      .then((response) => {
        setMenuItems({ items: response.data.items, ...response.data });
      })
      .finally(() => {
        setLoading(false);
        requestInProgress.current = false;
      });
  };

  useEffect(() => {
    getProductsById();
  }, [id]);

  return (
    <>
      <ProductsModal open={openProductsModal} close={() => handleOpenProductsModal()}></ProductsModal>
      <Tab.Container defaultActiveKey="Grid">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-between mb-0">
            <h3 className="mb-0">{menuItems?.menu_name}</h3>
            <h3>{menuItems?.menu_image}</h3>
          </div>
          <div className="d-flex gap-2">
            <Link
              to={"/menu"}
              className="btn btn-outline-primary btn-md d-flex gap-2 align-items-center"
            >
              <i className="la la-angle-left mr-2"></i>
              Voltar
            </Link>
            <Button variant="primary" size="md" onClick={() => handleOpenProductsModal()}>
              Adicionar produtos
            </Button>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group search-area2 style-1">
            <span className="input-group-text p-0">
              <Link to={"#"}>
                <svg
                  className="me-1"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z"
                    fill="#FC8019"
                  />
                </svg>
              </Link>
            </span>
            <input
              type="text"
              className="form-control p-0"
              placeholder="Procurar produtos"
            />
          </div>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey="List">
            <MenuList />
          </Tab.Pane>
          <Tab.Pane eventKey="Grid">
            {loading && (
              <div className="row">
                {Array.of(...Array(10)).map((_, index) => (
                  <div
                    key={index}
                    className="col-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                  >
                    <Skeleton height={200} width={250} />
                  </div>
                ))}
              </div>
            )}
            {menuItems?.items.length && !loading ? (
              <div className="row">
                {menuItems.items.map((item, ind) => (
                  <React.Fragment key={ind}>
                    <div className="col-xl-3 col-xxl-3 col-sm-6" key={ind}>
                      <div className="card dishe-bx b-hover style-1">
                        <div className="card-body pb-0 pt-3">
                          <div className="text-center mb-2">
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
                          </div>
                          <div className="border-bottom pb-3">
                            <h4 className="font-w500 mb-1">{item.name}</h4>
                          </div>
                        </div>
                        <div className="card-footer border-0 pt-2">
                          <div className="common d-flex align-items-center justify-content-between">
                            <div>
                              <Link to={"#"}>
                                <h4>{item.title}</h4>
                              </Link>
                              <h3 className=" mb-0 text-primary">
                                R$ {item.price}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <div className="d-flex align-items-center justify-content-xl-between justify-content-center flex-wrap pagination-bx">
                  <div className="mb-sm-0 mb-3 pagination-title">
                    <p className="mb-0">
                      <span>Mostrando 1-5</span> de <span>100</span> produtos
                    </p>
                  </div>
                  <nav>
                    <ul className="pagination pagination-gutter">
                      <li className="page-item page-indicator">
                        <Link to={"#"} className="page-link">
                          <i className="la la-angle-left"></i>
                        </Link>
                      </li>
                      <li className="page-item active">
                        <Link to={"#"} className="page-link">
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link to={"#"} className="page-link">
                          2
                        </Link>
                      </li>

                      <li className="page-item">
                        <Link to={"#"} className="page-link">
                          3
                        </Link>
                      </li>
                      <li className="page-item page-indicator">
                        <Link to={"#"} className="page-link">
                          <i className="la la-angle-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            ) : (
              !loading && (
                <p className="mb-1">
                  Essa categoria não há produtos vinculados.
                </p>
              )
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
export default FavoriteMenu;
