import React, { useState } from 'react';
import _ from 'lodash';
import warninglogo from '../../images/icons/icon_ui/icon_ui_warning-bg.png';
import { useGlobal } from '../../hooks/global';

const Record = () => {
  const { records } = useGlobal();
  const [_id, setId] = useState(-1);

  const convertToDate = (data) => {
    const date = new Date(data);
    const year = date.getYear() + 1900;
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    return year + '.' + month + '.' + day + ' ' + hour + ':' + min + ':' + sec;
  };

  let selectMenuArray = [];
  records.forEach((data, index) => {
    selectMenuArray.push([
      _.get(records[index], 'default.title'),
      _.get(records[index], 'created_at'),
    ]);
  });

  const SelectMenu = (props) => {
    const ListItem = (props) => (
      <div
        className="list-block"
        key={props.blockId}
        role="button"
        onClick={() => setId(props.blockId)}
        aria-hidden
      >
        <p className="op-name">{'작전명: ' + props.opName}</p>
        <p className="op-date">{'작전 일자 ' + props.opDay}</p>
      </div>
    );

    let dataList = [];
    props.list.forEach((block, blockId) => {
      dataList.unshift(
        <ListItem
          key={blockId}
          blockId={blockId}
          opName={selectMenuArray[blockId][0]}
          opDay={convertToDate(selectMenuArray[blockId][1])}
        />,
      );
    });

    return (
      <div className="content record-right">
        <div className="title">작전 보고서 목록</div>
        <div className="data-record-list">{dataList}</div>
      </div>
    );
  };

  const RecordMenu = (props) => (
    <>
      <div className="content-deco-1" />
      <div className="content-deco-2" />
      <div className="content record-left">
        <div className="record-title">{props.operationName}</div>
        <div className="record-author">
          <p>총책임자 : {props.kaltsitText}</p>
          <p>현장지휘관 : {props.drName}</p>
        </div>
        <div className="record-date">
          <p>작전일자 : {props.date}</p>
        </div>
        <div className="content record-info">
          <div className="title record-info">{props.opText}</div>
          <div className="record-opnumber">{props.num}</div>
          <div className="data-record-info">{_id === -1 ? <WarningMsg /> : <div />}</div>
        </div>
        <div className="content record-restriction">
          <div className="title">{props.restrictText}</div>
          <div className="data-record-restriction"></div>
        </div>
        <div className="content record-score">
          <div className="title">{props.scoreText}</div>
          <div className="data-record-score">{props.score}</div>
        </div>
      </div>
    </>
  );

  RecordMenu.defaultProps = {
    kaltsitText: '■■■■■■■■',
    drName: '■■■■■■■■',
    date: '■■■■■■■■■■',
    opText: 'CENSORED',
    operationName: 'AUTHORIZED ONLY\nRESTRICTED INFORMATION',
    num: 'CENSORED',
    restrictText: 'CENSORED',
    scoreText: 'CENSORED',
    score: '■■■',
  };

  const WarningMsg = () => (
    <div className="warning-msg">
      <img className="warning-image" src={warninglogo} alt="경고 메시지" />
      <div className="warning-text">
        <p>박사, 작전 기록 열람을 허가한다.</p>
        <p>우측의 보고서 목록을 클릭하여 확인하도록.</p>
        <p>- Dr. 켈시</p>
      </div>
    </div>
  );

  return (
    <>
      {_id !== -1 ? (
        <RecordMenu
          kaltsitText="켈시"
          drName={_.get(records[_id], 'default.name')}
          date={convertToDate(_.get(records[_id], 'created_at'))}
          opText="출전했던 오퍼레이터들"
          operationName=<div
            style={{ display: 'table-cell', fontSize: '36px', verticalAlign: 'middle' }}
          >
            {_.get(records[_id], 'default.title')}
          </div>
          num={'총원 ' + _.get(records[_id], 'default.operatorLimit') + '명'}
          restrictText="적용했던 제약"
          scoreText="점수"
          score="미구현"
        />
      ) : (
        <RecordMenu />
      )}
      <SelectMenu list={selectMenuArray} />
    </>
  );
};

export default Record;
