import React from 'react';

export const createContext = (options = {}) => {
  const Context = React.createContext(undefined);
  Context.displayName = options.name;
  return [Context.Provider, Context.Consumer, Context];
};
