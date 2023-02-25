import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';


const store = configureStore({
  devTools: true,
  middleware(getDefaultMiddleware) {
    return [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
    ];
  },
  reducer: reducers,
});

export default store;
