import { Toast } from "primereact/toast";
import React, { createContext, useRef } from "react";

export const ToastContext = createContext({} as any);

export const ToastProvider = ({ children }) => {
  const toastRef = useRef<Toast>(null);
  return (
    <>
      <ToastContext.Provider value={{ toastRef }}>
        {children}
      </ToastContext.Provider>
      <Toast ref={toastRef}></Toast>
    </>
  );
};
