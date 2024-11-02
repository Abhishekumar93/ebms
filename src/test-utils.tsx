import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { persistor } from "@/store";
// import type { AppStore, RootState } from "@/store";
import { PersistGate } from 'redux-persist/integration/react';
import { PreloadedState } from '@reduxjs/toolkit';
import { rootReducer } from './store/rootReducer';
import { AppStore, RootState, setupStore } from './store/test/setupStore';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// Mock the store for testing
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(rootReducer, preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<NonNullable<unknown>>): JSX.Element {
    return (
      <React.StrictMode>
        <Provider store={store}>{children}</Provider>
      </React.StrictMode>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
