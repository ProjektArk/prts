import { fromJS } from 'immutable';
import React from 'react';
import base64 from 'base-64';
import styled from 'styled-components';
import { initSetting } from '../static';
import { useGlobal } from '../../hooks/global';
import Table, { TableCell, TableRow } from '../atoms/table';
import Box from '../atoms/box';
import { applyStyleProps, getRemainTimer } from '../utils';
import { currentEventUrl } from '../../static/database/event';

const SecretCode = ({ todayRecord }) => (
  <div style={{ wordBreak: 'break-all', fontSize: '10px', lineHeight: '1.2', cursor: 'default' }}>
    {base64.encode(todayRecord.toString())}
  </div>
);

const Home = () => {
  const { setRecord, setMenu } = useGlobal();
  const { current: today } = React.useRef(new Date());
  const { current: todayString } = React.useRef(
    `${today.getFullYear()}${today.getMonth() + 1}${`0${today.getDate()}`.slice(-2)}`,
  );
  const { current: todayRecord } = React.useRef(
    fromJS(initSetting).setIn(['default', 'title'], todayString),
  );

  const [infoMsg, setInfoMsg] = React.useState('');

  const [remainTime, setRemainTime] = React.useState(getRemainTimer());

  React.useEffect(() => {
    setInterval(() => setRemainTime(getRemainTimer()), 1000);
  }, []);

  return (
    <Table height="500px" width="100%" background-color="rgba(0, 0, 0, 0.5)">
      <tbody>
        <TableRow height="300px">
          <TableCell width="50%" padding="6px" rowSpan="2">
            <StyledTitle theme="notice">
              SYSTEM: projekt ARK에 오신것을 환영합니다 박사님.
            </StyledTitle>
            <StyledContents theme="notice">
              <StyledDiv padding="0px 20px">
                <div>
                  Projekt ARK에 오신 것을 환영합니다 박사님.
                  <br />
                  <br />
                  본 시스템은 박사님이 변화무쌍한 작전 환경에 대응하실 수 있도록 고안된
                  프로그램입니다.
                  <br />
                  <br />이 페이지 내의 모든 사항은 <span>1급 기밀</span>이므로 보안에 주의하여
                  주십시오.
                  <br />
                  <br />
                  시스템의 사용법을 익히시려면 상단의 <span>사용 가이드</span> 항목을
                  참고해주십시오.
                </div>
              </StyledDiv>
              <StyledDiv padding="20px 20px 0px 20px">
                <Box width="100%">
                  <StyledDiv padding="0px 10px 15px 20px" font-size="25px" line-height="150%">
                    CURRENT OPERATION
                  </StyledDiv>
                  <iframe
                    width="99.8%"
                    src={`${currentEventUrl.replace('/watch?v=', '/embed/')}?mute=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                  />
                </Box>
              </StyledDiv>
            </StyledContents>
          </TableCell>
          <TableCell padding="5px">
            <StyledTitle theme="alert">!얼럿 시뮬레이터</StyledTitle>
            <StyledContents theme="alert">
              <StyledDiv padding="8px 20px" font-size="14px">
                <div>
                  오퍼레이터 스즈란이 작전 중 적의 유령 부대에 의해 납치된 것으로 보입니다.
                  <br />
                  이는 그녀의 어머니가 우리에게 보여준 신뢰에 반하는 일이며 오퍼레이터 스즈란의
                  시라쿠사 본가, 더 나아가 극동과도 관계가 크게 악화될 수 있는 중대한 사안입니다.
                  <br />
                  <br />
                  다행히 적들의 이동경로가 감지되었고 대외적으로 발표되기까진 시간이 남아있습니다.
                  <br />
                  그러나 서두르셔야 합니다. 너무 늦는다면 그녀를 영영 볼 수 없게 될지도 모릅니다..
                  <br />
                  <br />
                  보안을 위해 자세한 작전 사항은 암호화되어 있습니다.
                  <br />
                  <span>&#39;작전 코드 기록&#39;</span> 버튼을 눌러 수령하고,
                  <span>작전기록</span> 에서 자세한 사항을 확인해주십시오.
                </div>
                <SecretCode todayRecord={todayRecord} />
              </StyledDiv>
            </StyledContents>
          </TableCell>
        </TableRow>
        <TableRow height="150px">
          <TableCell padding="5px">
            <StyledTitle theme="timer">남은시간</StyledTitle>
            <StyledContents theme="timer">
              <StyledDiv display="inline-block" font-size="55px" padding-left="40px">
                {remainTime}
              </StyledDiv>
              <StyledDiv display="inline-block">
                <StyledRecordButton
                  onClick={() => {
                    setRecord(todayRecord);
                    setInfoMsg('작전 기록 완료. 3초 후 작전기록 메뉴로 이동합니다.');
                    setTimeout(() => {
                      setInfoMsg('');
                      setMenu('/record');
                    }, 3000);
                  }}
                >
                  작전 코드 기록 ▶
                </StyledRecordButton>
              </StyledDiv>
              <StyledInfo>{infoMsg}</StyledInfo>
              <StyledDiv font-size="11px" padding="10px" bottom="0" position="absolute">
                <hr style={{ marginBottom: '5px' }} />
                *얼럿 시뮬레이터는 긴급 상황을 가정하여 진행하는 모의 작전입니다. 주어진 조건과 환경
                내에서 반드시 작전을 완수하십시오.
              </StyledDiv>
            </StyledContents>
          </TableCell>
        </TableRow>
      </tbody>
    </Table>
  );
};
const StyledInfo = styled.span`
  position: absolute;
  font-weight: 900;
  font-size: 15px;
  bottom: 50px;
  right: 50px;
  color: white;
`;
const StyledRecordButton = styled.button`
  height: 45px;
  line-height: 100%;
  float: right;
  border: none;
  padding: 0px 25px;
  border-radius: 25px;
  position: absolute;
  right: 50px;
  top: 42px;
  width: 250px;
  font-size: 22px;
  background-color: gray;
  color: white;
  cursor: pointer;
`;
const StyledDiv = styled.div`
  div {
    padding: 10px 0;
    span {
      color: white;
      font-weight: bold;
    }
  }
  ${(props) => applyStyleProps(props)}
`;
const StyledContents = styled.div`
  border: 1px solid gray;
  border-top: 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: darkgray;
  ${({ theme }) => {
    if (theme == 'alert') {
      return `height: calc(100% - 50px);`;
    } else if (theme == 'timer') {
      return `height: calc(100% - 15px);`;
    } else if (theme == 'notice') {
      return 'height: calc(100% - 35px);';
    }
  }}
`;
const StyledTitle = styled.div`
  font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  line-height: 175%;
  border: 1px solid gray;
  height: 35px;
  padding: 2px 20px;
  font-size: 22px;
  ${({ theme }) => {
    if (theme == 'alert') {
      return 'padding: 0px 20px; background-color: red; opacity: 0.6; height: 50px; font-size: 30px; border-bottom: 0px;';
    } else if (theme == 'timer') {
      return `border-bottom: 0px; font-size: 15px; height: 15px`;
    }
  }}
`;

export default Home;
