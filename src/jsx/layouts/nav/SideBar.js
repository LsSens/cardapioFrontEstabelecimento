/// Menu
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import Collapse from "react-bootstrap/Collapse";

/// Link
import { Link, NavLink } from "react-router-dom";

import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "Meu restaurante",
};

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  let handleheartBlast = document.querySelector(".heart");
  function heartBlast() {
    return handleheartBlast.classList.toggle("heart-blast");
  }

  useEffect(() => {}, []);
  //For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  const handleMenuActive = (status) => {
    setState({ active: status });
    //console.log(state.active);
    if (state.active === status) {
      //setActive('');
      setState({ active: "" });
    }
  };
  /// Active menu
  const menuList = [
    {
      title: "Meu restaurante",
      to: "restaurant",
      iconStyle: "bi bi-shop-window",
    },
    {
      title: "Categorias",
      to: "menu",
      iconStyle: "bi bi-list",
    },
    {
      title: "Produtos",
      to: "products",
      iconStyle: "bi bi-box-seam",
    },
    {
      title: "Pedidos",
      to: "orders",
      iconStyle: "bi bi-receipt",
    },
    {
      title: "Clientes",
      to: "customers",
      iconStyle: "bi bi-people",
    },
  ];

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  useEffect(() => {
    const actualRoute = menuList.find(item => item.to === path)?.title
    handleMenuActive(actualRoute)
  }, []);

  return (
    <div
      className={`dlabnav  border-right ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          <li className="menu-title"></li>
          {menuList.map((data, index) => {
              return (
                <li
                  className={`${
                    state.active === data.title ? "mm-active" : ""
                  }`}
                  key={index}
                  onClick={() => handleMenuActive(data.title)}
                >
                  <NavLink to={data.to}>
                    <i className={data.iconStyle}></i>
                    <span className="nav-text">{data.title}</span>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
