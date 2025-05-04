
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
};

const accountVerifyInformView = createSlice({
  name: 'account-verify-inform-page',
  initialState,
  reducers: {
    visible: (state) => {
      state.visible = true;
    
    },
    hidden: (state) => {
        state.visible = false;
    },
  },
});

export const { setCredentials, clearCredentials } = accountVerifyInformView.actions;
export default accountVerifyInformView.reducer;
