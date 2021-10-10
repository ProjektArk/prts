import React, { useState } from 'react';
import _ from 'lodash';
import warninglogo from '../../images/icons/icon_ui/icon_ui_warning-bg.png';
import { useGlobal } from '../../hooks/global';
import operators from '../../static/database/master/operators.json';
import positions from '../../static/database/master/positions.json';

const Record = () => {
  let { records } = useGlobal();
  const { removeAllRecords } = useGlobal();
  const { removeRecord } = useGlobal();
  const [_id, setId] = useState(-1);
  // 임시 오류 체크 코드
  if (_id !== -1) {
    const error = (errorCode) => {
      setId(-1);
      alert(
        '"미안하군, 박사. 작전 기록 데이터에 오류가 있어서 데이터를 불러오는 데 실패했다. 만약 데이터를 임의로 조작한 것이 아니라면, ARK 시스템을 관리하고 있는 개발자들에게 문의해 주겠나?"\n\n-- 오류 코드는 [ 그런건가-' +
          errorCode +
          ' ] (이)다.\n\n- 닥터 켈시',
      );
    };
    if (records[_id] === null) {
      error(0);
    }

    let a = _.get(records[_id], 'operators');
    a.forEach((data) => {
      if (!Number.isInteger(data) || data < 1 || data > 189) error(1);
    });
  }

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
        <div className="delete-menu">
          <div
            className="delete-this"
            onClick={() => {
              let current = [].slice.call(records) || {};
              removeRecord(current, _id);
              setId(-1);
            }}
            aria-hidden
          >
            해당 작전 삭제
          </div>
          <div
            className="delete-all"
            onClick={() => {
              if (
                confirm(
                  '정말 모든 작전 기록을 삭제할 건가? 한 번 삭제하면 되돌릴 수 없다. 신중히 결정하도록.\n모든 작전 기록을 삭제하겠다면, [ 확인 ] 을 클릭해라.\n\n-- 닥터 켈시',
                )
              ) {
                removeAllRecords();
                setId(-1);
              }
            }}
            aria-hidden
          >
            모든 작전 삭제
          </div>
        </div>
      </div>
    );
  };

  const RecordMenu = (props) => {
    const OpItem = (props) => (
      <div className="op-item">
        <div className="op-class">{positions.find((opid) => opid.id == props.opPosition).name}</div>
        <img className="op-image" src={props.opThumbnail} alt={props.opName} />
        <div className="op-star">{'★★★★★★'.slice(0, props.opRarity)}</div>
        <div className={'op-blur r' + props.opRarity}></div>
        <div className="op-label">{props.opName}</div>
      </div>
    );

    let opDataList = [].slice.call(_.get(records[_id], 'operators') || {});
    opDataList.forEach((data, index) => {
      opDataList[index] = operators.find((operator) => operator.id == data);
    });
    opDataList.sort((a, b) => b.rarity - a.rarity);
    opDataList.forEach((data, index) => {
      opDataList[index] = (
        <OpItem
          key={index}
          opThumbnail={require('../../images/icons/icon_cha/' + data.thumbnail).default}
          opName={data.name}
          opPosition={data.position_id}
          opRarity={data.rarity}
        />
      );
    });

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
        <div className="content-deco-1" />
        <div className="content-deco-2" />
        <div className="content record-left">
          <div className="record-title">{props.operationName}</div>
          <div className="record-author">
            <p>총책임자 : {props.kaltsitText}</p>
            <p>현장지휘관 : {props.drName}</p>
          </div>
          <div className="record-date">
            <p>작전일자 {props.date}</p>
            <p>작전 지역 : {props.opMap}</p>
          </div>
          <div className="content record-info">
            <div className="title record-info">{props.opText}</div>
            <div className="record-opnumber">{props.num}</div>
            <div className="data-record-info">{_id === -1 ? <WarningMsg /> : opDataList}</div>
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
  };

  RecordMenu.defaultProps = {
    kaltsitText: '■■■■■■■■',
    drName: '■■■■■■■■',
    date: '■■■■■■■■■■',
    opMap: '■■■■■■■■',
    opText: 'CENSORED',
    operationName: 'AUTHORIZED ONLY\nRESTRICTED INFORMATION',
    num: 'CENSORED',
    restrictText: 'CENSORED',
    scoreText: 'CENSORED',
    score: '■■■',
  };

  return (
    <>
      {_id !== -1 ? (
        <RecordMenu
          kaltsitText="켈시"
          drName={_.get(records[_id], 'default.name')}
          date={convertToDate(_.get(records[_id], 'created_at'))}
          opMap={_.get(records[_id], 'choosedMap')}
          opText="출전했던 오퍼레이터들"
          operationName={
            <div style={{ display: 'table-cell', fontSize: '36px', verticalAlign: 'middle' }}>
              {_.get(records[_id], 'default.title')}
            </div>
          }
          num={'총원 ' + _.get(records[_id], 'default.operatorLimit') + '명'}
          restrictText="적용했던 제약"
          scoreText="점수"
          score={_.get(records[_id], 'score') + '점'}
        />
      ) : (
        <RecordMenu />
      )}
      <SelectMenu list={selectMenuArray} />
    </>
  );
};

export default Record;
