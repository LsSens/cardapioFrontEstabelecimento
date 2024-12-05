import api from "./Api";

export function getMenus() {
  return api.get(`/menus`);
}

export function addMenu(menu_name, image) {
  return api.post(`/menus`, { menu_name, image });
}

export function editMenu(menu_id, menu_name) {
  return api.put(`/menus/${menu_id}`, { menu_name });
}

export function deleteMenu(menu_id) {
  return api.delete(`/menus/${menu_id}`);
}
