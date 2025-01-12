import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSidebarCollapseToLocaleStorage } from '@/shared/lib/helpers';

type TypeSidebarState = {
    isCollapsed: boolean,
    wasFirstRendering: boolean,
}

const initialState: TypeSidebarState = {
  isCollapsed: getSidebarCollapseToLocaleStorage(),
  wasFirstRendering: true,
};

const SidebarSlice = createSlice({
  name: 'Sidebar',
  initialState,
  reducers: {
    setIsCollapsed: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isCollapsed: action.payload,
    }),
    setWasFirstRendering: (state, action: PayloadAction<boolean>) => ({
      ...state,
      wasFirstRendering: action.payload,
    }),
  },
});

export default SidebarSlice.reducer;

export const { setIsCollapsed, setWasFirstRendering } = SidebarSlice.actions;
