"use client";
import { makeStore, RootState } from "@/redux/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({
  children,
  preloadState,
}: {
  children: React.ReactNode;
  preloadState?: Partial<RootState>;
}) => {
  const storeRef = useRef(makeStore(preloadState));
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
