import api from "./Api";

export function getCustomers() {
  return api.get(`/customers`);
}
