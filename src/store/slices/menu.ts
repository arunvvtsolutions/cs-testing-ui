// types
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

import { MenuProps } from 'types/menu';
import axios from 'utils/axios';
import { LAYOUT_CONST } from 'constant';

// initial state
const initialState: MenuProps = {
  selectedItem: ['dashboard'],
  selectedID: null,
  drawerOpen: false,
  filterDrawer: false,
  chatDrawer: true,
  visualizationDrawer: false,
  error: null,
  menu: {},
  activeLayout: LAYOUT_CONST.DEFAULT_DRAWER,
  lastVisitedRoute: '/'
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload;
    },

    activeID(state, action) {
      state.selectedID = action.payload;
    },
    openVisualizationDrawer(state, action) {
      state.visualizationDrawer = action.payload;
    },
    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },
    openFilterDrawer(state, action) {
      state.filterDrawer = action.payload;
    },
    openChatDrawer(state, action) {
      state.chatDrawer = action.payload;
    },
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    // get dashboard menu
    getMenuSuccess(state, action) {
      state.menu = action.payload;
    }
  }
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID, openFilterDrawer, openChatDrawer, openVisualizationDrawer } =
  menu.actions;

export function getMenu() {
  return async () => {
    try {
      const response = await axios.get('/api/menu/widget');
      dispatch(menu.actions.getMenuSuccess(response.data.widget));
    } catch (error) {
      dispatch(menu.actions.hasError(error));
    }
  };
}
