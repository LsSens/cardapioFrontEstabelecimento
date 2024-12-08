import { createSelector } from 'reselect';

export const getActiveMenu = (state, id) => {
    state.menu.activeMenu.find((post) => post.menu_id === id);
};

export const getPost = () => createSelector([getActiveMenu], (menu) => menu);
