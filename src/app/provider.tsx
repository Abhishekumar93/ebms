"use client";

import { IChildrenProp } from "@/interface/childrenProps.interface";
import { persistor, setupStore } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: IChildrenProp) {
  return (
    <Provider store={setupStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
