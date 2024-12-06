
import { MENU_REDIRECT_ACTION } from '../actions/MenuActions';

const initialState = {
  activeMenu: null
};

export function MenuReducer(state = initialState, action) {
    if (action.type === MENU_REDIRECT_ACTION) {
        return {
            ...state,
            activeMenu: action.payload
        };
    }
    return state;
}

    
