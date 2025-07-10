import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type PreloadedState = Partial<RootState>;