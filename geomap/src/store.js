import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice'
import fileUploadReducer from './slices/fileUploadSlice'
import globalReducer from './slices/modeSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        global: globalReducer,
        file: fileUploadReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;