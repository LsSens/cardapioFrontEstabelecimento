import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Products = ({ product, handleEditProduct }) => {
  const { image, name, description, price } = product;
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="new-arrival-product">
            <div className="new-arrivals-img-contnent">
              <Dropdown className="dropdown ms-auto" style={{textAlign: 'right'}}>
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
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => handleEditProduct(product)}>
                    Editar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {image ? (
                <img
                  className="text-truncate"
                  src={image}
                  alt={name}
                  style={{
                    width: "60px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    paddingRight: "8px",
                    margin: "0 auto",
                    display: "block",
                  }}
                />
              ) : (
                <i
                  className="bi bi-image-fill"
                  style={{
                    fontSize: "60px",
                    display: "flex",
                    textAlign: "center",
                    lineHeight: "60px",
                    color: "#ccc",
                    paddingRight: "8px",
                    width: "60px",
                    height: "100px",
                    margin: "0 auto",
                    alignItems: "center",
                  }}
                  title={name}
                ></i>
              )}
            </div>
            <div className="new-arrival-content text-center mt-3">
              <h4>
                <Link to="/ecom-product-detail">{name}</Link>
              </h4>
              {description || "-"}
              <br />
              <span className="price">R${price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
