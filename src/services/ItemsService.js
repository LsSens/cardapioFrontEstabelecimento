import api from "./Api";

export function getItems() {
  return api.get(`/items`);
}

export function deleteItems(id) {
  return api.delete(`/items/${id}`);
}

export function createItem(data) {
  return api.post(`/items`, data)
}

export function editItem(data) {
  return api.put(`/items/${data.id}`, data)
}