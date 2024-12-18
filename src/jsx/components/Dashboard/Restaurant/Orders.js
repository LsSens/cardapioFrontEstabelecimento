import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { getOrders } from "../../../../services/ordersService";
import { formatToBrasiliaTime } from "../../../utils/formatTime";
import Swal from "sweetalert2";
import { deleteDelivery, postDeliveries } from "../../../../services/DeliveriesServices";
import Skeleton from "react-loading-skeleton";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleAcceptOrder = () => {
    Swal.fire({
      title: "Aceitar Pedido?",
      text: `Deseja aceitar o pedido #${selectedOrder.id}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceitar",
      cancelButtonText: "Voltar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const orders = [selectedOrder.id];
          await postDeliveries(orders);
          await fetchOrders();
          Swal.fire("Aceito!", "O pedido foi aceito com sucesso.", "success");
        } catch (error) {
          console.error("Erro ao aceitar pedido:", error);
          Swal.fire("Erro!", "Houve um problema ao aceitar o pedido.", "error");
        }
      }
    });
  };

  const handleRejectOrder = () => {
    Swal.fire({
      title: "Rejeitar Pedido?",
      text: `Deseja rejeitar o pedido #${selectedOrder.id}?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Rejeitar",
      cancelButtonText: "Voltar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para rejeitar o pedido
        console.log(`Pedido #${selectedOrder.id} rejeitado!`);
        Swal.fire("Rejeitado!", "O pedido foi rejeitado com sucesso.", "success");
      }
    });
  };

  const handleCancelOrder = () => {
    Swal.fire({
      title: "Cancelar Pedido?",
      text: `Deseja cancelar o pedido #${selectedOrder.id}?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Cancelar",
      cancelButtonText: "Voltar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDelivery(selectedOrder.delivery_id);
          await fetchOrders();
          Swal.fire("Aceito!", "O pedido foi cancelado com sucesso.", "success");
        } catch (error) {
          console.error("Erro ao cancelado pedido:", error);
          Swal.fire("Erro!", "Houve um problema ao cancelado o pedido.", "error");
        }
      }
    });
  };

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

  useEffect(() => {
    fetchOrders();

  }, []);

  return (
    <>
      <div className="col-xl-12">
        <h2>Pedidos</h2>
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
            onClick={() => navigate('create')}
          >
            Novo pedido
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-5">
          <div className="card">
            <Tab.Container defaultActiveKey="PENDING">
              <div className="card-body">
                <nav className="order-tab">
                  <Nav className="nav-tabs text-center">
                    <Nav.Link eventKey="PENDING" id="nav-order-tab">
                      Aguardando
                    </Nav.Link>
                    <Nav.Link eventKey="PREPARING" id="nav-prepared-tab">
                      Preparando
                    </Nav.Link>
                    <Nav.Link eventKey="ONWAY" id="nav-onWay-tab">
                      A caminho
                    </Nav.Link>
                    <Nav.Link eventKey="DELIVERED" id="nav-delivered-tab">
                      Entregue
                    </Nav.Link>
                  </Nav>
                </nav>
                <Tab.Content style={{ maxHeight: "550px", overflow: "auto" }}>
                  {loading ? (
                    <div className="d-flex flex-column gap-3 align-items-center">
                      {Array.of(...Array(5)).map((_, index) => (
                        <Skeleton height={80} width={300} />
                      ))}
                    </div>
                  ) : (
                    ["PENDING", "PREPARING", "Delivered"].map((status) => (
                      <Tab.Pane eventKey={status} key={status}>
                        {orders?.data?.filter((order) => order.status === status)
                          .map((order, ind) => (
                            <div
                              className={`orderin-bx position-relative d-flex align-items-center justify-content-between ${selectedOrder?.id === order.id ? "selected-order" : ""
                                }`}
                              key={ind}
                              onClick={() => handleSelectOrder(order)}
                              style={{ cursor: "pointer" }}
                            >
                              {order.ifood_id ? (
                                <div className="position-absolute top-0 p-1 d-flex align-items-center gap-2" style={{ right: 0 }}>
                                  <p className="m-0"># {order.ifood_id}</p>
                                  <img src="https://logopng.com.br/logos/ifood-43.png" alt="Bootstrap logo" width="50"></img>
                                </div>
                              ) : null}
                              <div>
                                <h4>Pedido #{order.id}</h4>
                                <span>{formatToBrasiliaTime(order.createdAt)}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <h4 className="text-primary mb-0">R$ {order.total}</h4>
                                <Link to={"#"} className="icon-bx">
                                  <i className="fa-solid fa-angle-right"></i>
                                </Link>
                              </div>
                            </div>
                          ))}
                      </Tab.Pane>
                    ))
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
                      <div className="d-flex justify-content-between">
                        <h4 className="cate-title mb-sm-3 mb-2 mt-xl-0 mt-3">
                          Detalhes do pedido
                        </h4>
                        {selectedOrder.ifood_id ? (
                          <div className="position-absolute top-0 p-1 d-flex align-items-center gap-2" style={{ right: 0 }}>
                            <p className="m-0"># {selectedOrder.ifood_id}</p>
                            <img src="https://logopng.com.br/logos/ifood-43.png" alt="Bootstrap logo" width="50"></img>
                          </div>
                        ) : null}
                        <h4 className="cate-title mb-sm-3 mb-2 mt-xl-0 mt-3">
                          {selectedOrder.status}
                        </h4>
                      </div>
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
                            <h6 className="font-w500">Endereço</h6>
                            <span>
                              {selectedOrder.customer.address.street + ", " + selectedOrder.customer.address.number + ", " + selectedOrder.customer.address.city || "-"}
                            </span>
                          </div>
                        </div>
                        <div className="orders-img d-flex mb-4">
                          <div>
                            <h6 className="font-w500">Nome do cliente</h6>
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
                    {selectedOrder.status === 'PENDING' ? (
                      <>
                        <button
                          className="btn btn-outline-danger me-sm-4 me-2"
                          onClick={handleRejectOrder}
                        >
                          Rejeitar pedido
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={handleAcceptOrder}
                        >
                          Aceitar pedido
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-outline-danger me-sm-4 me-2"
                        onClick={handleCancelOrder}
                      >
                        Cancelar pedido
                      </button>
                    )}
                  </div>
                </>
              ) :
                <div className="card h-auto">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 className="cate-title mb-sm-3 mb-2 mt-xl-0 mt-3">
                        Detalhes do pedido
                      </h4>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap">
                      <div className="mb-4">
                        <Skeleton height={30} width={100} />
                      </div>
                      <div className="orders-img d-flex mb-4">
                        <Skeleton height={30} width={100} />
                      </div>
                      <div className="orders-img d-flex mb-4">
                        <Skeleton height={30} width={100} />
                      </div>
                    </div>
                    <div className="order-menu style-1 mt-3">
                      <h4>Itens do pedido</h4>
                      <Skeleton height={30} width={'100%'} />
                      <Skeleton height={30} width={'100%'} />
                      <Skeleton height={30} width={'100%'} />
                      <Skeleton height={30} width={'100%'} />
                    </div>
                    <hr style={{ opacity: "0.7" }} />
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="font-w500 mb-0">Total</h4>
                      <h4 className="cate-title text-primary">
                        <Skeleton height={30} width={100} />
                      </h4>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
