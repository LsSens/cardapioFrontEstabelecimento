import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getCustomers } from "../../../services/CustomersService";
import { formatPhoneNumber } from "../../utils/formatPhone";
import { Link } from "react-router-dom";

function CustomerBox({ customer, onSelect }) {
  return (
    <li className="chat-bx" onClick={() => onSelect(customer)}>
      <div className="chat-img">
        <img src="https://via.placeholder.com/50" alt={customer.name} />
      </div>
      <div className="mid-info">
        <h4 className="name mb-2">{customer.name}</h4>
        <span>{formatPhoneNumber(customer.phone)}</span>
      </div>
      <div className="right-info">
        <p className="mb-2">#{customer.id}</p>
      </div>
    </li>
  );
}

function CustomerDetails({ customer }) {
  const orders = [
    {
      id: 1,
      date: "08/12/2024 12:45",
      total: "R$ 150,00",
      status: "Concluído",
    },
    {
      id: 2,
      date: "08/12/2024 18:30",
      total: "R$ 200,00",
      status: "Cancelado",
    },
    {
      id: 3,
      date: "08/12/2024 14:15",
      total: "R$ 350,00",
      status: "Concluído",
    },
  ];

  return (
    <div className="customer-details p-4">
      <h3 className="mb-3">{customer.name}</h3>
      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item">
          <strong>Email:</strong> {customer.email || "Não informado"}
          <strong className="ps-3">Telefone:</strong>{" "}
          {formatPhoneNumber(customer.phone) || "Não informado"}
        </li>
        <li className="list-group-item">
          <strong>Endereço:</strong>
          <br />
          {customer.address ? (
            <>
              {customer.address.street} - {customer.address.number}{" "}
              {customer.address.complement
                ? "- " + customer.address.complement
                : null}
              , {customer.address.city} - {customer.address.state},{" "}
              {customer.address.cep}
            </>
          ) : (
            "Não informado"
          )}
        </li>
      </ul>
      <h4 className="mb-3">Pedidos</h4>
      <ul className="list-group list-group-flush">
        {orders.map((order) => (
          <li
            key={order.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>#{order.id}</strong> - {order.date}
              <br />
              <span>{order.status}</span>
            </div>
            <div className="d-flex flex-column">
              <strong>{order.total}</strong>
              <Link to="#" className="text-primary text-decoration-none">
                Mais detalhes
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="row">
      <div className="col-xl-4">
        <div className="card chat-box h-auto">
          <div className="card-header border-0 px-4">
            <div className="input-group search-area2">
              <span className="input-group-text">
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
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Procurar"
              />
            </div>
          </div>
          <PerfectScrollbar className="dlab-scroll">
            <div className="card-body pt-0" id="chat-sidebar">
              <ul>
                {loading ? (
                  <li>Carregando...</li>
                ) : customers.length > 0 ? (
                  customers.map((customer) => (
                    <CustomerBox
                      key={customer.id}
                      customer={customer}
                      onSelect={setSelectedCustomer}
                    />
                  ))
                ) : (
                  <li>Nenhum cliente encontrado.</li>
                )}
              </ul>
            </div>
          </PerfectScrollbar>
        </div>
      </div>

      <div className="col-xl-8">
        <div className="card h-auto">
          {selectedCustomer ? (
            <CustomerDetails customer={selectedCustomer} />
          ) : (
            <div className="card-body d-flex justify-content-center align-items-center">
              <p>Selecione um cliente para ver os detalhes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;
