import api from "./Api";

export function getOrders() {
  return api.get(`/orders`);
}