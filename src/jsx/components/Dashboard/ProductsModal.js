import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const ProductsModal = ({ open, close }) => {
  const productsMock = [
    {
      image: "",
      name: "Product A",
      title: "Amazing Dish",
      price: 19.99,
    },
    {
      image: "",
      name: "Product B",
      title: "Incredible Treat",
      price: 23.49,
    },
    {
      image: "",
      name: "Product C",
      title: "Savory Snack",
      price: 9.99,
    },
    {
      image: "",
      name: "Product D",
      title: "Sweet Delight",
      price: 14.59,
    },
    {
      image: "",
      name: "Product E",
      title: "Hearty Meal",
      price: 29.99,
    },
    {
      image: "",
      name: "Product F",
      title: "Light Snack",
      price: 5.99,
    },
    {
      image: "",
      name: "Product G",
      title: "Tasty Bite",
      price: 8.49,
    },
    {
      image: "",
      name: "Product H",
      title: "Quick Meal",
      price: 12.99,
    },
    {
      image: "",
      name: "Product I",
      title: "Healthy Dish",
      price: 20.0,
    },
    {
      image: "",
      name: "Product J",
      title: "Refreshing Treat",
      price: 18.75,
    },
  ];

  return (
    <Modal className="fade bd-example-modal-lg" show={open} size="xl" scrollable={true}>
      <Modal.Header>
        <Modal.Title>Vincular produtos</Modal.Title>
        <Button variant="" className="btn-close" onClick={close}></Button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {productsMock.map((item, ind) => (
            <React.Fragment key={ind}>
              <div className="col-xl-3 col-xxl-3 col-sm-6" key={ind}>
                <div className="card dishe-bx b-hover style-1">
                  <Form.Check type={'radio'} className="position-absolute" style={{top: 20, left: 20}}/>
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
                        <h4>{item.title}</h4>
                        <h3 className=" mb-0 text-primary">R$ {item.price}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger light" onClick={close}>
          Fechar
        </Button>
        <Button variant="" type="button" className="btn btn-primary">
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
