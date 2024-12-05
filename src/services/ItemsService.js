import api from "./Api";

export function getItems() {
  return api.get(`/items`);
}
