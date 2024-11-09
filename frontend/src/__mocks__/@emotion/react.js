import * as React from 'react';

export const ThemeContext = React.createContext({});
export const useTheme = () => React.useContext(ThemeContext);
export const jsx = (type, props) => React.createElement(type, props);
export const css = () => '';
export const Global = () => null;
export const keyframes = () => '';
export const CacheProvider = ({ children }) => children;
