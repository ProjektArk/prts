import React, { useState } from 'react';
import warninglogo from '../../images/icons/icon_ui/icon_ui_warning-bg.png';

const Record = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('records')));
  const [_id, setId] = useState(-1);
  const changeId = (value) => {
    setId(value);
  };
  console.log(data); // For Test

  const selectMenuArray = [];
  if (data !== null) {
    for (let i = 0; i < data.length; i++) {
      selectMenuArray.push(data[i]['default']['title']);
    }
  }
  console.log('Test: ' + selectMenuArray);

  const SelectMenu = (props) => {
    let dataList = [];
    for (let i = props.list.length - 1; i >= 0; i--) {
      dataList.push(
        <div key={i} role="button" tabIndex={0} onKeyDown={() => {}} onClick={() => changeId(i)}>
          {'작전명: ' + props.list[i]}
        </div>,
      );
    }
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
        <div className="record-title">
          <p>AUTHORIZED ONLY</p>
          <p>RESTRICTED INFORMATION</p>
        </div>
        <div className="record-author">
          <p>총책임자 : {props.kaltsitText}</p>
          <p>현장지휘관 : {props.drName}</p>
        </div>
        <div className="record-date">
          <p>작전일자 : {props.date}</p>
        </div>
        <div className="content record-info">
          <div className="title record-info">{props.operationName}</div>
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
    date: '■■■■-■■-■■',
    operationName: 'CENSORED',
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
          drName={data[_id]['default']['name']}
          date="아직 미구현"
          operationName={data[_id]['default']['title']}
          num="아직 미구현"
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
