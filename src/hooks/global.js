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
  const removeRecord = (before, index) => {
    if (index === -1) {
      alert('지울 작전을 먼저 선택해라, 박사.\n\n-- 닥터 켈시');
      return;
    }
    before.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(before));
    setGState((p) => p.set('records', before));
  };
  // 주의: 제가 record라는 매개변수를 oper로 바꿨고, 맵 정보도 저장하도록 operMap을 추가했습니다
  // 치명적인 결과가 예상된다면 절대 main에 push하지 말아 주세요
  const setRecord = (oper, operMap) => {
    const records = JSON.parse(localStorage.getItem('records') || JSON.stringify([]));
    records.push(
      oper
        .updateIn(
          ['default', 'title'],
          (title) => title || _.get(randomTitles, _.random(randomTitles.length - 1)),
        )
        .set('created_at', Date.now())
        .set('choosedMap', operMap)
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
    <GlobalContext.Provider
      value={{ ...gState.toJS(), setMenu, setRecord, removeAllRecords, removeRecord }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const GlobalContext = React.createContext([fromJS(initGState), () => {}]);

export const useGlobal = () => React.useContext(GlobalContext);
