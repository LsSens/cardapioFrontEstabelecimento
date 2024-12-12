import api from "./Api";

export function postDeliveries(orders) {
    return api.post(`/deliveries`, { orders });
}

export function deleteDelivery(deliveryId) {
    return api.delete(`/deliveries/${deliveryId}`);
}
