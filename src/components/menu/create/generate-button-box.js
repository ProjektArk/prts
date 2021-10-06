import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useGlobal } from '../../../hooks/global';
import Box from '../../atoms/box';
import { InputText } from '../../atoms/input';

const GenerateButtonBox = (props) => {
  const { setting, setSetting, resetSetting } = props;
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
      <Box height="150px" width="88%" className="t_center" title="작전명">
        <InputText
          id="default.title"
          value={setting.getIn(['default', 'title'])}
          onChange={(e) => {
            e.target.value.length < 9 && handleSetting(e);
          }}
          className="mt_4 mb_4"
        />
        <h6>최대 8글자까지 가능합니다.</h6>
        <h6>입력하지 않아도 PRTS가 자동으로 생성합니다.</h6>
      </Box>
      <StyledGenerate
        className="t_center"
        onClick={() => {
          setRecord(setting);
          resetSetting();
        }}
        style={{ height: '320px' }}
      >
        <img src={require('../../../images/icons/icon_ui/icon_ui_generate.png').default} alt="" />
        <button>작전 생성</button>
      </StyledGenerate>
    </Styled>
  );
};
const Styled = styled.div`
  padding-left: 30px;
`;
const StyledGenerate = styled.div`
  cursor: pointer;
  img {
    width: 120px;
    padding: 20px;
    margin-top: 30px;
    border-radius: 100%;
    border: 15px solid gray;
  }
  button {
    cursor: pointer;
    margin-top: 20px;
    border-radius: 25px;
    width: 80%;
    height: 45px;
    border: none;
    font-size: 18pt;
    font-weight: bold;
    line-height: 100%;
  }
  :hover button {
    background-color: orange;
  }
  :hover img,
  :hover button {
    border-color: orange;
  }
`;
export default GenerateButtonBox;
