import api from "./Api";

export function getLinkIfood() {
    return api.post(`/ifood/generate-user-code`);
}

export function postCodeIfood(authorizationCode, authorizationCodeVerifier) {
    return api.post(`/ifood/generate-token`, { authorizationCode, authorizationCodeVerifier })
}

export function unlinkIfood() {
    return api.delete(`/ifood/unlink`)
}