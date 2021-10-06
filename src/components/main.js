import _ from 'lodash';
import React from 'react';
import { useGlobal } from '../hooks/global';

import Menu from './menu';

const menuObj = {
  '/': Menu.Home,
  '/create': Menu.Create,
  '/record': Menu.Record,
  '/developers': Menu.Developers,
  '/guide': Menu.Guide,
};

const Main = () => {
  const { menu, records, removeAllRecords } = useGlobal();
  const Component = _.get(menuObj, menu);

  return (
    <div className="mid-wrapper">
      <div className="content-wrapper">
        <Component />
      </div>
      <div className="layout-pusher" />
      <h3 className="mt_3 mb_2" style={{ color: 'white' }}>
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
      {records.map((item, index) => (
        <div key={index}>
          <span style={{ color: 'white' }}>{`${index}: ${JSON.stringify(item)}`}</span>
        </div>
      ))}
    </div>
  );
};

export default Main;
