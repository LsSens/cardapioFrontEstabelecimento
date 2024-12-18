import api from "./Api";

export function getItems({menuId, page}) {
  console.log(`getItems ~ menuId, page:`, menuId, page)
  return api.get(menuId ? `/items?menu_id=${menuId}&page=${page || 1}` :`/items?page=${page}`);
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