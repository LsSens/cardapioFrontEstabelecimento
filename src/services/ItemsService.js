import api from "./Api";

export function getItems() {
  return api.get(`/items`);
}

export function deleteItems(id) {
  return api.delete(`/items/${id}`);
}