import React from 'react';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { randomTitles } from '../components/static';

const initGState = {
  menu: '/',
  records: [],
};

export const GlobalProvider = ({ children }) => {
  const [gState, setGState] = React.useState(fromJS(initGState));
  const setMenu = (menu) => setGState((p) => p.set('menu', menu));
  const removeAllRecords = () => {
    localStorage.removeItem('records');
    setGState((p) => p.set('records', []));
  };
  const setRecord = (record) => {
    const records = JSON.parse(localStorage.getItem('records') || JSON.stringify([]));
    records.push(
      record
        .updateIn(
          ['default', 'title'],
          (title) => title || _.get(randomTitles, _.random(randomTitles.length - 1)),
        )
        .set('created_at', Date.now())
        .toJS(),
    );
    localStorage.setItem('records', JSON.stringify(records));
    setGState((p) => p.set('records', records));
  };

  React.useEffect(() => {
    const records = JSON.parse(localStorage.getItem('records') || JSON.stringify([]));
    setGState((p) => p.set('records', records));
  }, []);
  return (
    <GlobalContext.Provider value={{ ...gState.toJS(), setMenu, setRecord, removeAllRecords }}>
      {children}
    </GlobalContext.Provider>
  );
};

const GlobalContext = React.createContext([fromJS(initGState), () => {}]);

export const useGlobal = () => React.useContext(GlobalContext);
