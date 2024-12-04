import api from "./Api";

export function getMenus() {
  return api.get(`/menu`);
}

export function addMenu(menu_name) {
  return api.post(`/menu`, { menu_name });
}

export function editMenu(menu_id, menu_name) {
  return api.put(`/menu/${menu_id}`, { menu_name });
}

export function deleteMenu(menu_id) {
  return api.delete(`/menu/${menu_id}`);
}
