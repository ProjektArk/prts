import React from 'react';
import styled from 'styled-components';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { useGlobal } from '../../../hooks/global';
import Box from '../../atoms/box';
import { ButtonGenerate } from '../../atoms/button';
import { InputText } from '../../atoms/input';
import operators from '../../../static/database/master/operators.json';

const GenerateButtonBox = (props) => {
  const { setting, selected, setSetting, resetSetting } = props;
  const { setRecord } = useGlobal();

  const handleSetting = React.useCallback(
    ({ target }) => {
      const { id, value, type, checked } = target;

      setSetting((prevState) =>
        prevState.setIn(id.split('.'), type === 'checkbox' ? checked : value),
      );
    },
    [setSetting],
  );

  const getRandomizedOpers = () => {
    const allOperatorIds = fromJS(operators.map((operator) => operator.id));
    const subtracted = allOperatorIds.toSet().subtract(setting.get('restrict').toSet());
    const randomOpers = [];

    const limit = setting.getIn(['default', 'operatorLimit']);

    while (randomOpers.length < limit) {
      const gotRandomOper = subtracted.get(_.random(subtracted.size));
      !randomOpers.includes(gotRandomOper) && randomOpers.push(gotRandomOper);
    }

    return randomOpers;
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
          const operators = getRandomizedOpers();
          setRecord(setting.set('operators', operators));
        }}
      />
    </Styled>
  );
};
const StyledBox = styled(Box)`
  ${({ long }) => (long ? 'height: 465px;' : 'height: 150px;')}
  width: 88%;
  text-align: center;
  span {
    font-size: 80px;
  }
`;
const Styled = styled.div`
  padding-left: 30px;
`;

export default GenerateButtonBox;
