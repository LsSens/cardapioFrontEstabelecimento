import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { getOrders } from "../../../../services/ordersService";
import { formatToBrasiliaTime } from "../../../utils/formatTime";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
        setSelectedOrder(response.data.data[0])
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xl-5">
          <div className="card">
            <Tab.Container defaultActiveKey="Order">
              <div className="card-body">
                <nav className="order-tab">
                  <Nav className="nav-tabs">
                    <Nav.Link eventKey="Order" id="nav-order-tab">
                      Aguardando
                    </Nav.Link>
                    <Nav.Link eventKey="Prepared" id="nav-prepared-tab">
                      Preparando
                    </Nav.Link>
                    <Nav.Link eventKey="Delivered" id="nav-delivered-tab">
                      Entregue
                    </Nav.Link>
                  </Nav>
                </nav>
                <Tab.Content style={{ maxHeight: "550px", overflow: 'auto' }}>
                  {loading ? (
                    <p>Carregando pedidos...</p>
                  ) : (
                    <>
                      <Tab.Pane eventKey="Order">
                        {orders.data.map((order, ind) => (
                          <div
                            className={`orderin-bx d-flex align-items-center justify-content-between ${selectedOrder?.id === order.id ? "selected-order" : ""
                              }`}
                            key={ind}
                            onClick={() => handleSelectOrder(order)}
                            style={{ cursor: "pointer" }}
                          >
                            <div>
                              <h4>Pedido #{order.id}</h4>
                              <span>
                                {formatToBrasiliaTime(order.createdAt)}
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <h4 className="text-primary mb-0">
                                R$ {order.total}
                              </h4>
                              <Link to={"#"} className="icon-bx">
                                <i className="fa-solid fa-angle-right"></i>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </Tab.Pane>
                      <Tab.Pane eventKey="Prepared">
                        {orders.data
                          .filter((order) => order.status === "Prepared")
                          .map((order, ind) => (
                            <div
                              className="orderin-bx d-flex align-items-center justify-content-between"
                              key={ind}
                            >
                              <div>
                                <h4>Pedido #{order.id}</h4>
                                <span>{order.createdAt}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <h4 className="text-primary mb-0">
                                  R$ {order.total}
                                </h4>
                                <Link to={"#"} className="icon-bx">
                                  <i className="fa-solid fa-angle-right"></i>
                                </Link>
                              </div>
                            </div>
                          ))}
                      </Tab.Pane>
                      <Tab.Pane eventKey="Delivered">
                        {orders.data
                          .filter((order) => order.status === "Delivered")
                          .map((order, ind) => (
                            <div
                              className="orderin-bx d-flex align-items-center justify-content-between"
                              key={ind}
                            >
                              <div>
                                <h4>Pedido #{order.id}</h4>
                                <span>{order.createdAt}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <h4 className="text-primary mb-0">
                                  R$ {order.total}
                                </h4>
                                <Link to={"#"} className="icon-bx">
                                  <i className="fa-solid fa-angle-right"></i>
                                </Link>
                              </div>
                            </div>
                          ))}

                      </Tab.Pane>
                    </>
                  )}
                </Tab.Content>
                <div className="d-flex align-items-center justify-content-xl-between justify-content-center flex-wrap pagination-bx  mt-4">
                  <div className="mb-sm-0 mb-3 pagination-title">
                    <p className="mb-0">
                      <span>Mostrando {orders.data?.length ?? 0}</span> de <span>{orders.totalItems ?? 0}</span> pedidos
                    </p>
                  </div>
                  <nav>
                    <ul className="pagination  pagination-gutter">
                      <li className="page-item page-indicator">
                        <Link to={"#"} className="page-link">
                          <i className="la la-angle-left"></i>
                        </Link>
                      </li>
                      {Array.of(...Array(orders.totalPages)).map((_, index) => (
                        <li className={orders.currentPage === index + 1 ? "page-item active" : "page-item"}>
                          <Link to={"#"} className="page-link" onClick={() => 'changePage'(index + 1)}>
                            {index + 1}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </Tab.Container>
          </div>
        </div>
        <div className="col-xl-7">
          <div>
            <div className="card border-0">
              {selectedOrder ? (
                <>
                  <div className="card h-auto">
                    <div className="card-body">
                      <h4 className="cate-title mb-sm-3 mb-2 mt-xl-0 mt-3">
                        Detalhes do pedido
                      </h4>
                      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap">
                        <div className="mb-4">
                          <h4 className="font-w500">
                            Pedido #{selectedOrder.id}
                          </h4>
                          <span>
                            {formatToBrasiliaTime(selectedOrder.createdAt)}
                          </span>
                        </div>
                        <div className="orders-img d-flex mb-4">
                          <div>
                            <h6 className="font-w500">Detalhes do cliente</h6>
                            <span>
                              {selectedOrder.customer.name || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="order-menu style-1 mt-3">
                        <h4>Itens do pedido</h4>
                        {selectedOrder.items.map((item, ind) => (
                          <div
                            className="d-flex align-items-center mb-4"
                            key={ind}
                          >
                            <div>
                              <h4 className="font-w600 text-nowrap mb-0 h6">
                                {item.name}
                              </h4>
                              <p className="mb-0">x{item.quantity}</p>
                            </div>
                            <h4 className="text-primary mb-0 ms-auto">
                              +R$ {(item.price * item.quantity).toFixed(2)}
                            </h4>
                          </div>
                        ))}
                      </div>
                      <hr style={{ opacity: "0.7" }} />
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="font-w500 mb-0">Total</h4>
                        <h4 className="cate-title text-primary">
                          R$ {selectedOrder.total}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <button className="btn btn-outline-danger me-sm-4 me-2">
                      Rejeitar pedido
                    </button>
                    <button className="btn btn-primary">Aceitar pedido</button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
