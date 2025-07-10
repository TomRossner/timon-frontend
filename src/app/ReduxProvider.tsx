'use client';

import { makeStore, PreloadedState } from '../store/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function ReduxProvider({
  children,
  preloadedState
}: {
  children: React.ReactNode,
  preloadedState: PreloadedState
}) {
  const store = makeStore(preloadedState);

  return <Provider store={store}>{children}</Provider>
}