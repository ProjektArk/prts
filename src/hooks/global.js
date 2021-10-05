import React from 'react';
import { fromJS } from 'immutable';

const initGState = { menu: '/' };

export const GlobalProvider = ({ children }) => {
  const [gState, setGState] = React.useState(fromJS(initGState));
  return <GlobalContext.Provider value={[gState, setGState]}>{children}</GlobalContext.Provider>;
};

const GlobalContext = React.createContext([fromJS(initGState), () => {}]);

export const useGlobal = () => React.useContext(GlobalContext);
