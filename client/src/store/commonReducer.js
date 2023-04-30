import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin : false
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setValue : (state, {payload: {key , value}})=>{
        state[key] = value;
    }
  }
});

export const { setValue } = common.actions;
export default common.reducer;
