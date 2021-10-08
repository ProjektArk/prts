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
  const { menu } = useGlobal();
  const Component = _.get(menuObj, menu);

  return (
    <div className="mid-wrapper">
      <div className="content-wrapper">
        <Component />
      </div>
      <div className="layout-pusher" />
    </div>
  );
};

export default Main;
