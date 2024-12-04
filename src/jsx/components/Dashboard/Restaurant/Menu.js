import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuPopularSlider from "./MenuPopularSlider";
import BestSellerSlider from "./BestSellerSlider";
import PromoSlider from "./PromoSlider";
import { addMenu, getMenus } from "../../../../services/MenuService";
import Alert from "sweetalert2";

//const init =  false;
function reducer(state, action) {
  switch (action.type) {
    case "addMenu":
      return { ...state, addMenu: !state.addMenu };
    default:
      return state;
  }
}

const Menu = () => {
  const initialState = { addMenu: false };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [menus, setMenus] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [loading, setLoading] = useState(false);
  const hasFetched = React.useRef(false);

  const addNewMenu = async () => {
    if (!menuName) return;
    setLoading(true);
    try {
      await addMenu(menuName).then(async (response) => {
        getMenus().then(async (response) => {
          setMenus(response.data);
        });
        Alert.fire({
          title: response.data.message,
          text: "A nova categoria foi salva com sucesso.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
    } catch (e) {
      Alert.fire({
        title: e.response?.data?.error || "Erro ao criar menu",
        text: "Não foi possivel criar o menu no momento",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setMenuName("");
      dispatch({ type: "addMenu" });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      setLoading(true);
      const fetchData = async () => {
        await getMenus().then(async (response) => {
          setMenus(response.data);
          setLoading(false);
        });
      };
      fetchData();
      hasFetched.current = true;
    }
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-xl-12 mb-4">
          <Skeleton height={40} width={200} />
          <div className="mt-3">
            <Skeleton height={100} />
          </div>
        </div>
        <div className="col-xl-12 mb-4">
          <Skeleton height={40} width={200} />
          <div className="mt-3">
            <Skeleton height={150} />
          </div>
        </div>
        <div className="col-xl-12 mb-4">
          <Skeleton height={40} width={200} />
          <div className="mt-3">
            <Skeleton height={150} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            <div className="input-group search-area2">
              <span className="input-group-text p-0">
                <Link to={"#"}>
                  <svg
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
                placeholder="Search here"
              />
            </div>

            <button
              type="button"
              className="btn btn-primary mt-3 mt-sm-0"
              onClick={() => dispatch({ type: "addMenu" })}
            >
              Nova categoria
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h4 className="mb-0 cate-title">Categorias</h4>
            <Link to={"/favorite-menu"} className="text-primary">
              View all <i className="fa-solid fa-angle-right ms-2"></i>
            </Link>
          </div>
          <MenuCategorySlider
            menus={menus}
            setMenus={setMenus}
            setLoading={setLoading}
          />
        </div>
        <div className="col-xl-12">
          <div className="d-flex align-items-center justify-content-between mb-2 mt-sm-0 mt-3">
            <h4 className=" mb-0 cate-title">Popular This Week</h4>
            <Link to={"/favorite-menu"} className="text-primary">
              View all <i className="fa-solid fa-angle-right ms-2"></i>
            </Link>
          </div>
          <MenuPopularSlider />
        </div>
        <div className="col-xl-12">
          <div className="d-flex align-items-center justify-content-between mb-2 mt-sm-0 mt-3">
            <h4 className=" mb-0 cate-title">Best Seller</h4>
            <Link to={"/favorite-menu"} className="text-primary">
              View all <i className="fa-solid fa-angle-right ms-2"></i>
            </Link>
          </div>
          <BestSellerSlider />
        </div>
        <div className="col-xl-12">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h4 className=" mb-0 cate-title">Promo</h4>
            <Link to={"/favorite-menu"} className="text-primary">
              View all <i className="fa-solid fa-angle-right ms-2"></i>
            </Link>
          </div>
          <PromoSlider />
        </div>
      </div>

      <Modal
        className="modal fade"
        show={state.addMenu}
        onHide={() => dispatch({ type: "addMenu" })}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="modalModalLabel">
            Adicionar categoria
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => dispatch({ type: "addMenu" })}
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="modal-inside">
              <label for="modalInputText" className="form-label">
                Nome da categoria
              </label>
              <input
                type="text"
                className="form-control"
                id="modalInputText"
                placeholder=""
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch({ type: "addMenu" })}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={addNewMenu}
          >
            Adicionar
          </button>
        </div>
      </Modal>
    </>
  );
};
export default Menu;
