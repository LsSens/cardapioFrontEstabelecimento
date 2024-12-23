import {
    LOADING_TOGGLE_ACTION,
    LOGIN_CONFIRMED_ACTION,
    LOGIN_FAILED_ACTION,
    LOGOUT_ACTION,
    SIGNUP_CONFIRMED_ACTION,
    SIGNUP_FAILED_ACTION,
    UPDATE_IFOOD_INTEGRATION_ACTION,
} from '../actions/AuthActions';

const initialState = {
    auth: {
        email: '',
        token: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

export function AuthReducer(state = initialState, action) {
    if (action.type === SIGNUP_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Cadastro realizado com sucesso',
            showLoading: false,
        };
    }
    if (action.type === LOGIN_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Login realizado com sucesso',
            showLoading: false,
        };
    }

    if (action.type === LOGOUT_ACTION) {
        return {
            ...state,
            errorMessage: '',
            successMessage: '',
            auth: {
                email: '',
                token: '',
                localId: '',
                expiresIn: '',
                refreshToken: '',
            },
        };
    }

    if (
        action.type === SIGNUP_FAILED_ACTION ||
        action.type === LOGIN_FAILED_ACTION
    ) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
        };
    }

    if (action.type === LOADING_TOGGLE_ACTION) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }

    // Novo case para atualizar o status do iFood
    if (action.type === UPDATE_IFOOD_INTEGRATION_ACTION) {
        return {
            ...state,
            auth: {
                ...state.auth,
                data: {
                    ...state.auth.data,
                    company: {
                        ...state.auth.data?.company,
                        ifood_integration: action.payload,
                    },
                },
            },
        };
    }

    return state;
}