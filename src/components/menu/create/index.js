import React from 'react';
import cx from 'classnames';
import { fromJS } from 'immutable';
import Tabs from './tabs';
import GenerateButtonBox from './generate-button-box';

const initSetting = {
  default: {
    name: '',
    operatorLimit: 1,
    isGlobal: false,
    map: {
      mainStory: [],
      resource: [],
      event: [],
    },
    title: '',
  },
  restrict: { allowed: [], disallowed: [] },
  additional: {},
  created_at: 0,
};

const Create = () => {
  const [selected, setSelected] = React.useState(1);
  const [setting, setSetting] = React.useState(fromJS(initSetting));
  const [temp, setTemp] = React.useState(JSON.parse(localStorage.getItem('records')) || []);

  const resetSetting = () => setSetting(fromJS(initSetting));

  const removeAllRecords = React.useCallback(() => {
    localStorage.removeItem('records');
    setTemp([]);
  }, []);

  const TabButton = (props) => {
    const { index, title } = props;
    return (
      <button
        className={cx(['tab-item', { selected: selected === index }])}
        onClick={() => setSelected(index)}
      >
        {title}
      </button>
    );
  };
  return (
    <>
      <div className="content-deco-1" />
      <div className="content-deco-2" />
      <div className="content create">
        <div className="tabs">
          <TabButton index={1} title="기본 설정" />
          <TabButton index={2} title="출격 오퍼레이터 지정/금지" />
        </div>
        <div className="d_if h_100 w_100">
          <div style={{ width: '70%' }}>
            {selected === 1 && <Tabs.Default setting={setting} setSetting={setSetting} />}
            {selected === 2 && <Tabs.Restrict setting={setting} setSetting={setSetting} />}
          </div>
          <div style={{ width: '30%' }}>
            <GenerateButtonBox
              setting={setting}
              setSetting={setSetting}
              resetSetting={resetSetting}
              setTemp={setTemp}
            />
          </div>
        </div>
        <h3 className="mt_4">디버깅 / 개발 편의를 위한 데이터 바인딩 상태 확인 ↓</h3>
        <span>{JSON.stringify(setting.toJS())}</span>
        <hr className="mt_3" />
        <h3 className="mt_3 mb_2">
          현재 로컬스토리지에 담긴 내용&nbsp;&nbsp;&nbsp;
          <button
            onClick={removeAllRecords}
            style={{
              border: 0,
              borderRadius: '10px',
              padding: '5px 10px',
              zIndex: 99999,
              cursor: 'pointer',
              lineHeight: '100%',
            }}
          >
            로컬스토리지 전부 삭제
          </button>
        </h3>

        {temp.map((item, index) => (
          <div key={index}>
            <span>{`${index}: ${JSON.stringify(item)}`}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Create;
