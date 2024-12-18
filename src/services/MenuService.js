import api from "./Api";

export function getMenus(page) {
  return api.get(`/menus?page=${page}`);
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

export function getMenuItemsById(id) {
  return api.get(`/menus/${id}`);
}

export function putItemsIntoMenu(menu_id, itemIds){
  return api.put(`/menus/${menu_id}/items`, {
    item_ids: itemIds
  });
}

export function deleteItemFromMenu(menu_id, itemId){
  return api.delete(`/menus/${menu_id}/items/${itemId}`);
}