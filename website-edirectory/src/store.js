import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { userApiSlice } from './slices/userApiSlice';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        auth: authReducer,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(userApiSlice.middleware),
    devTools: true,
});

export default store;
