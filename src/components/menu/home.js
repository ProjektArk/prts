import { fromJS } from 'immutable';
import React from 'react';
import styled from 'styled-components';
import base64 from 'base-64';
import _ from 'lodash';
import { initSetting } from '../static';
import { useGlobal } from '../../hooks/global';

const Today = () => {
  const { setRecord } = useGlobal();
  const { current: today } = React.useRef(new Date());
  const { current: todayString } = React.useRef(
    `${today.getFullYear()}${today.getMonth() + 1}${`0${today.getDate()}`.slice(-2)}`,
  );

  const [todayRecord, setTodayRecord] = React.useState(
    fromJS(initSetting).setIn(['default', 'title'], todayString),
  );

  const addToRecords = () => {
    setRecord(todayRecord);
  };

  return (
    <div className="home-today">
      <h1>오늘의 작전 암호</h1>
      <label>
        {base64.encode(todayRecord.toString())}
        <span onClick={addToRecords} aria-hidden>
          작전 기록에 추가하기
          <img src={require('../../images/icons/icon_ui/icon_ui_generate.png').default} alt="" />
        </span>
      </label>
    </div>
  );
};
const Home = () => (
  <Styled>
    <div className="home-title">PRTS 시스템에 오신것을 환영합니다.</div>
    <div className="home-contents">
      <img
        className="kaltsit"
        src={require('../../images/icons/icon_user/icon_kalsit_signature.png').default}
        alt=""
      />
      <Today />
    </div>
  </Styled>
);

const Styled = styled.div`
  width: 100%;
  color: white;
  text-align: center;
  min-height: 530px;
  position: relative;
  .home-today {
    width: 75%;
    h1 {
      text-align: left;
    }
    label {
      text-align: left;
      float: left;
      height: 120px;
      padding: 5px;
      border-radius: 10px;
      overflow: hidden;
      border: none;
      color: gray;
      background-color: transparent;
      word-break: break-all;
      span {
        cursor: pointer;
        height: 20px;
        float: right;
        font-size: 18px;
        border-radius: 20px;
        background-color: gray;
        opacity: 0.8;
        color: white;
        margin: 5px;
        padding: 6px 30px 6px 10px;
        line-height: 100%;
        vertical-align: middle;
        transition: opacity 0.3s;
        img {
          margin-left: 3px;
          width: 19px;
          position: absolute;
        }
        :hover {
          background-color: orange;
          opacity: 1;
        }
      }
    }
  }
  .home-title {
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    font-weight: 800;
    font-size: 30pt;
    line-height: 100%;
    padding: 15px 10px 10px 10px;
    border: 2px solid var(--white-line-color);
    border-bottom: 1px solid gray;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: gray;
    opacity: 0.8;
    color: white;
  }
  .home-contents {
    padding: 15px;
    height: 100%;
    border: 2px solid var(--white-line-color);
    border-top: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .kaltsit {
    position: absolute;
    top: 80px;
    right: 20px;
  }
`;
export default Home;
