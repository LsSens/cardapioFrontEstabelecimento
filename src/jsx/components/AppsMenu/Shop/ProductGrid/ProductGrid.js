import React, { Fragment, useEffect, useState } from "react";
import Products from "./Products";

/// Data
import { Link } from "react-router-dom";
import { getItems } from "../../../../../services/ItemsService";
import Skeleton from "react-loading-skeleton";
import { ProductCreate } from "./ProductCreate";

const ProductGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openProductCreate, setOpenProductCreate] = useState(false);
  const hasFetched = React.useRef(false);
  const [editProduct, setEditProduct] = useState();

  const handleEditProduct = (product) => {
    setEditProduct(product)
  }

  const handleAddProduct = () => setOpenProductCreate(true)

  const getProducts = () => {
    setLoading(true);
    const fetchData = async () => {
      await getItems().then(async (response) => {
        setItems(response.data.data);
      });
      setLoading(false);
    };
    fetchData();
    hasFetched.current = true;
  }

  useEffect(() => {
    if (!hasFetched.current) {
      getProducts()
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

  const onCloseProductModal = (editedProduct) => {
    if(editedProduct){
      getProducts()
    }

    setEditProduct(null)
  }

  return (
    <Fragment>
      <ProductCreate editProduct={editProduct} open={editProduct} close={({editedProduct}) => onCloseProductModal(editedProduct)}/>
      <div className="col-xl-12">
        <h2>Produtos</h2>
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
              placeholder="Procurar"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mt-3 mt-sm-0"
            onClick={() => handleAddProduct()}
          >
            Novo produto
          </button>
          <ProductCreate open={openProductCreate} close={() => setOpenProductCreate(false)} />
        </div>
      </div>
      <div className="row">
        {items.map((product) => (
          <Products handleEditProduct={() => handleEditProduct(product)} key={product.key} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductGrid;
