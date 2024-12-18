import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrdersCreate = () => {
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      email: "",
      phone: "",
    },
    items: [
      {
        item_id: "",
        quantity: 1,
      },
    ],
    total: "",
    payment_method: "",
    delivery_fee: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("customer.")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        customer: {
          ...prevState.customer,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const handleAddItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      items: [...prevState.items, { item_id: "", quantity: 1 }],
    }));
  };

  return (
    <>
      <div className="col-xl-12">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
          <h2>Novo Pedido</h2>
          <Link
            to={"/orders"}
            className="btn btn-outline-primary btn-md d-flex gap-2 align-items-center"
          >
            <i className="la la-angle-left mr-2"></i>
            Voltar
          </Link>
        </div>
      </div>
      <form id="orderForm">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="customerName" className="form-label">
              Nome do Cliente
            </label>
            <input
              type="text"
              id="customerName"
              name="customer.name"
              className="form-control"
              value={formData.customer.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="customerEmail" className="form-label">
              Email do Cliente
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customer.email"
              className="form-control"
              value={formData.customer.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="customerPhone" className="form-label">
              Telefone do Cliente
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customer.phone"
              className="form-control"
              value={formData.customer.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Itens</label>
          {formData.items.map((item, index) => (
            <div key={index} className="row mb-3">
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  placeholder="ID do Item"
                  value={item.item_id}
                  onChange={(e) =>
                    handleItemChange(index, "item_id", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantidade"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  min="1"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddItem}
          >
            Adicionar Item
          </button>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="total" className="form-label">
              Total
            </label>
            <input
              type="number"
              id="total"
              name="total"
              className="form-control"
              value={formData.total}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="paymentMethod" className="form-label">
              Método de Pagamento
            </label>
            <select
              id="paymentMethod"
              name="payment_method"
              className="form-control"
              value={formData.payment_method}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="credit_card">Cartão de Crédito</option>
              <option value="debit_card">Cartão de Débito</option>
              <option value="cash">Dinheiro</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="deliveryFee" className="form-label">
              Taxa de Entrega
            </label>
            <input
              type="number"
              id="deliveryFee"
              name="delivery_fee"
              className="form-control"
              value={formData.delivery_fee}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="notes" className="form-label">
              Observações
            </label>
            <textarea
              id="notes"
              name="notes"
              className="form-control"
              value={formData.notes}
              onChange={handleInputChange}
              style={{ resize: "none", height: 100 }}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "auto", display: "block" }}
        >
          Enviar
        </button>
      </form>
    </>
  );
};

export default OrdersCreate;
