import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SELECTED_MENU, StoreNames } from "../config";
import { OtherState } from "../types/OtherState";

const initialState:OtherState = {
    selectedMenu: SELECTED_MENU.BOOK
}

const OtherSlice = createSlice({
    name: StoreNames.OTHER,
    initialState,
    reducers: {
        reset: (state) => {
            state.selectedMenu = initialState.selectedMenu;
        },
        setSelectedMenu(state,action:PayloadAction<SELECTED_MENU>){
            state.selectedMenu = action.payload
        }
    },
});

export const {
   reset,
   setSelectedMenu
} = OtherSlice.actions;

export default OtherSlice.reducer;
