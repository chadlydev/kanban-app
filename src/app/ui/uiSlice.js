import { createSlice } from '@reduxjs/toolkit';
import { getInitialColorMode } from './getInitialColorMode';

const initialState = {
    dialog: {},
    menu: {},
    theme: {
        colorMode: getInitialColorMode(),
    },
    sidebar: {
        open: true,
    },
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openDialog: (state, action) => {
            const { dialogType, dialogProps } = action.payload;
            state.dialog = { dialogType, dialogProps };
        },
        closeDialog: state => {
            state.dialog = {};
        },
        openMenu: (state, action) => {
            const { menuType, variant, portalId } = action.payload;
            state.menu = { menuType, variant, portalId };
        },
        closeMenu: state => {
            state.menu = {};
        },
        openSidebar: state => {
            state.sidebar.open = true;
        },
        closeSidebar: state => {
            state.sidebar.open = false;
        },
        setLightTheme: state => {
            state.theme.colorMode = 'light';
        },
        setDarkTheme: state => {
            state.theme.colorMode = 'dark';
        },
    },
});

export const {
    openDialog,
    closeDialog,
    openMenu,
    closeMenu,
    openSidebar,
    closeSidebar,
    setLightTheme,
    setDarkTheme,
} = uiSlice.actions;

export default uiSlice.reducer;