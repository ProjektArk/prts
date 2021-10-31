import React from 'react';
import styled from 'styled-components';
import { fromJS } from 'immutable';
import { useGlobal } from '../../../hooks/global';
import Box from '../../atoms/box';
import { ButtonGenerate } from '../../atoms/button';
import { InputText } from '../../atoms/input';
import maps from '../../../static/database/master/maps.json';
import { getRandomizedOpers } from '../../utils';

const GenerateButtonBox = (props) => {
  const { setting, selected, setSetting, resetSetting } = props;
  const [infoMsg, setInfoMsg] = React.useState('');
  const { setRecord, setMenu } = useGlobal();

  const handleSetting = React.useCallback(
    ({ target }) => {
      const { id, value, type, checked } = target;

      setSetting((prevState) =>
        prevState.setIn(id.split('.'), type === 'checkbox' ? checked : value),
      );
    },
    [setSetting],
  );

  const getRandomizedMap = () => {
    const mapsId = fromJS(maps.map((m) => m.id));
    const confirmedMapList = [];
    let alwaysAccept = false;
    const rule = {
      0: setting.getIn(['default', 'map', 'mainStory']),
      1: setting.getIn(['default', 'map', 'resource']),
      2: setting.getIn(['default', 'map', 'event']),
    };
    if (rule[0].size === 0 && rule[1].size === 0 && rule[2].size === 0) alwaysAccept = true;

    mapsId.forEach((currentId) => {
      const currentData = maps.find((data) => data.id === currentId);
      if (alwaysAccept || rule[currentData.type].includes(currentData.level))
        confirmedMapList.push(currentData.id);
    });
    const randomNumber = Math.floor(Math.random() * confirmedMapList.length);
    const choosedMapId = confirmedMapList[randomNumber];

    const choosedMapData = maps.find((data) => data.id === choosedMapId);
    const altList = {
      0: ['1지역', '2지역', '3지역', '4지역', '5지역', '6지역', '7지역', '8지역', '9지역'],
      1: ['월', '화', '수', '목', '금', '토', '일', 
        '방어 분쇄',
        '화물 운송',
        '공중 위협',
        '자원 보장',
        '전술 연습',
        '추풍낙엽',
        '솔선수범',
        '난공불락',
        '질풍노도',
      ],
      2: ['기병과 사냥꾼', '파란 불꽃의 마음', '소란의 법칙', '흑야의 회고록'],
    };
    const choosedAlt = altList[choosedMapData.type][choosedMapData.level - 1];
    const choosedMap = choosedMapData.name;

    return `【${choosedAlt}】 ${choosedMap}`;
  };

  return (
    <Styled>
      {selected == 1 && (
        <StyledBox title="작전명">
          <InputText
            id="default.title"
            value={setting.getIn(['default', 'title'])}
            onChange={(e) => {
              e.target.value.length < 9 && handleSetting(e);
            }}
            className="mt_2 mb_4"
          />
          <h6>최대 8글자까지 가능합니다.</h6>
          <h6>입력하지 않아도 PRTS가 자동으로 생성합니다.</h6>
        </StyledBox>
      )}
      {selected == 2 && (
        <StyledBox title="작전 위험성 평가">
          <span>{setting.get('score')}</span>
        </StyledBox>
      )}
      <ButtonGenerate
        onClick={() => {
          resetSetting();
          const operators = getRandomizedOpers(setting);
          const opMap = getRandomizedMap();
          setRecord(
            setting.set('operators', operators).remove('restrict').set('choosedMap', opMap),
          );
          setInfoMsg('작전 기록 완료. 3초 후 작전기록 메뉴로 이동합니다.');
          setTimeout(() => {
            setInfoMsg('');
            setMenu('/record');
          }, 3000);
        }}
      />
      {infoMsg && <StyledInfo>{infoMsg}</StyledInfo>}
    </Styled>
  );
};
const StyledInfo = styled.span`
  position: absolute;
  font-weight: 900;
  font-size: 15px;
  right: 0px;
  bottom: 0px;
`;
const StyledBox = styled(Box)`
  ${({ long }) => (long ? 'height: 465px;' : 'height: 150px;')}
  width: 88%;
  text-align: center;
  span {
    font-size: 80px;
  }
`;
const Styled = styled.div`
  position: relative;
  padding-left: 30px;
`;

export default GenerateButtonBox;
