import React from 'react';
import styled from 'styled-components';
import { useGlobal } from '../../../hooks/global';
import Box from '../../atoms/box';
import { ButtonGenerate } from '../../atoms/button';
import { InputText } from '../../atoms/input';

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
        <StyledBox title="제약 점수">
          <span>{setting.get('score')}</span>
        </StyledBox>
      )}
      <ButtonGenerate
        onClick={() => {
          setRecord(setting);
          resetSetting();
        }}
      />
    </Styled>
  );
};
const StyledBox = styled(Box)`
  height: 150px;
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
