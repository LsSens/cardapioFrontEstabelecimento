import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product: { image, name, description, price } }) => {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="new-arrival-product">
            <div className="new-arrivals-img-contnent">
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
                    display: "block"
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
                    margin: '0 auto',
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
              {description || '-'}
              <br/>
              <span className="price">R${price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
