import type { PreloadedState } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../rootReducer";

const reducer = rootReducer;
export const setupStore = (
  rootReducer: any,
  preloadedState?: PreloadedState<RootState>
) => {
  return configureStore({
    reducer: rootReducer ?? reducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
