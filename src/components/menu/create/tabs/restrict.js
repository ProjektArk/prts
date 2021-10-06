import React from 'react';
import { fromJS, Set } from 'immutable';
import _ from 'lodash';
import cx from 'classnames';
import styled from 'styled-components';
import Box, { BoxItem } from '../../../atoms/box';
import { InputTextWithSearchMark } from '../../../atoms/input';
import { ButtonGroup, ButtonWithOrder } from '../../../atoms/button';
import Operator from '../../../atoms/operator';
import RestrictObj from '../../../atoms/restrictObj';
import operatorsData from '../../../../static/database/master/operators.json';
import restrictsData from '../../../../static/database/master/restricts.json';
import { getRestrictScore } from '../../../static';

const Restrict = (props) => {
  const { setting, setSetting } = props;
  const [operatorsMaster, setOperatorsMaster] = React.useState(fromJS(operatorsData));
  const [restrictsMaster, setRestrictMaster] = React.useState(fromJS(restrictsData));
  const [mode, setMode] = React.useState('allowed');
  const [searchTab, setSearchTab] = React.useState('operator');
  const [search, setSearch] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [order, setOrder] = React.useState(fromJS({ target: 'rarity', desc: false }));

  const toggleOrder = (e) =>
    setOrder((prevState) => {
      const desc = prevState.get('target') == e.target.id ? !prevState.get('desc') : false;
      return fromJS({ target: e.target.id, desc });
    });

  React.useEffect(() => {
    const result = fromJS(operatorsData).sortBy((operator) => operator.get(order.get('target')));
    setOperatorsMaster(order.get('desc') ? result : result.reverse());
  }, [order]);

  React.useEffect(() => {
    setSetting(setting.set('score', getRestrictScore(setting.get('restrict'))));
  }, [setSetting, setting]);

  const getRestricts = React.useCallback(
    () =>
      search
        ? restrictsMaster.filter((restrict) => restrict.get('name').includes(search))
        : restrictsMaster,
    [restrictsMaster, search],
  );
  const getExpectedOpers = React.useCallback(() => {
    const expectedOpers = operatorsMaster
      .filter((operator) => !setting.getIn(['restrict']).includes(operator.get('id')))
      .map((operator) => operator.get('id'));

    return search
      ? expectedOpers.filter((operator_id) => {
          const foundOperator = operatorsMaster.find(
            (operator) => operator.get('id') == operator_id,
          );
          return (
            _.lowerCase(foundOperator.get('name')).includes(_.lowerCase(search)) ||
            foundOperator
              .get('aliasName')
              .find((item) => _.lowerCase(item).includes(_.lowerCase(search)))
          );
        })
      : expectedOpers;
  }, [operatorsMaster, search, setting]);

  return (
    <div className="d_if w_100">
      <div style={{ height: '463px', width: '60%', paddingRight: '30px' }}>
        <Box height="100%" width="100%" className="d_if">
          <StyledSearchTab>
            <button
              className={cx({ active: searchTab === 'operator' })}
              onClick={() => setSearchTab('operator')}
            >
              오퍼레이터 검색
            </button>
            <button
              className={cx({ active: searchTab === 'restrict' })}
              onClick={() => setSearchTab('restrict')}
            >
              제약 검색
            </button>
          </StyledSearchTab>
          {searchTab === 'operator' && (
            <BoxItem long>
              <StyledTextWithSearchMark>
                <InputTextWithSearchMark
                  className="w_50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  reset={() => setSearch('')}
                />
              </StyledTextWithSearchMark>
              <Box className="mt_3 " width="92%" height="76%">
                <div className="t_center mb_2">
                  <ButtonWithOrder id="rarity" order={order} onClick={toggleOrder}>
                    등급순
                  </ButtonWithOrder>
                  <ButtonWithOrder id="cost" order={order} onClick={toggleOrder}>
                    코스트순
                  </ButtonWithOrder>
                  <ButtonWithOrder id="position_id" order={order} onClick={toggleOrder}>
                    직군순
                  </ButtonWithOrder>
                  <ButtonWithOrder id="name" order={order} onClick={toggleOrder}>
                    가나다순
                  </ButtonWithOrder>
                </div>
                <hr />
                <div className="mt_3" style={{ height: '90%', overflowY: 'auto' }}>
                  {getExpectedOpers().map((operator_id) => (
                    <Operator
                      key={operator_id}
                      operator={operatorsMaster.find(
                        (operator) => operator.get('id') == operator_id,
                      )}
                      onClick={() => {
                        setSetting((prevState) => {
                          const list = prevState.get('restrict');
                          const shouldUpdateRestrict = list.includes(operator_id)
                            ? list
                            : list.push(operator_id);
                          return prevState.set('restrict', shouldUpdateRestrict);
                        });
                      }}
                      onMouseEnter={(description) => setDescription(description)}
                    />
                  ))}
                </div>
              </Box>
            </BoxItem>
          )}
          {searchTab === 'restrict' && (
            <BoxItem long>
              <StyledTextWithSearchMark>
                <InputTextWithSearchMark
                  className="w_50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  reset={() => setSearch('')}
                />
                <ButtonGroup
                  className="btn-group"
                  setValue={setMode}
                  value={mode}
                  items={[
                    { id: 'allowed', name: '지정 모드' },
                    { id: 'disallowed', name: '금지 모드' },
                  ]}
                />
              </StyledTextWithSearchMark>
              <Box className="mt_3" width="92%" height="76%">
                {getRestricts().map((restrict) => (
                  <RestrictObj
                    key={restrict.get('id')}
                    restrict={restrict}
                    getExpectedOpers={getExpectedOpers}
                    onClick={(operator_ids) => {
                      operator_ids.size > 0 &&
                        setSetting((prevState) =>
                          prevState.updateIn(['restrict'], (list) =>
                            new Set(list.concat(operator_ids)).toList(),
                          ),
                        );
                    }}
                    onMouseEnter={(description) => setDescription(description)}
                  />
                ))}
              </Box>
            </BoxItem>
          )}
        </Box>
      </div>
      <div style={{ height: '463px', width: '40%', padding: '0px 30px' }}>
        <Box className="mb_4" height="40%" width="100%" long>
          <h3 className="t_center">설명</h3>
          <StyledDescription>{description}</StyledDescription>
        </Box>
        <Box height="40%" width="100%" long>
          <h3 className="t_center">금지 오퍼레이터</h3>
          <div className="mt_3" style={{ height: '80%', overflowY: 'auto' }}>
            {setting.getIn(['restrict']).map((operator_id) => (
              <Operator
                key={operator_id}
                small
                operator={operatorsMaster.find((operator) => operator.get('id') == operator_id)}
                onClick={() =>
                  setSetting((prevState) =>
                    prevState.updateIn(['restrict'], (list) =>
                      list.filter((id) => id != operator_id),
                    ),
                  )
                }
                onMouseEnter={(description) => setDescription(description)}
              />
            ))}
          </div>
        </Box>
        <StyledButtons>
          <button
            onClick={() => setSetting((prevState) => prevState.setIn(['restrict'], fromJS([])))}
          >
            모두 초기화
          </button>
        </StyledButtons>
      </div>
    </div>
  );
};
const StyledDescription = styled.pre`
  margin-top: 10px;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  font-size: 20px;
  white-space: pre-line;
  padding: 5px 20px;
`;
const StyledTextWithSearchMark = styled.div`
  .btn-group {
    float: right;
  }
`;
const StyledButtons = styled.div`
  width: 100%;
  padding: 5px 15px;
  text-align: center;
  button {
    font-size: 10pt;
    line-height: 100%;
    border: 0px;
    padding: 8px 20px;
    cursor: pointer;
    color: black;
    font-weight: bold;
    border-radius: 15px;
    background-color: gray;
    border-color: gray;
  }
  button:hover {
    background-color: darkgray;
    border-color: darkgray;
  }
`;

const StyledSearchTab = styled.div`
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
  button {
    cursor: pointer;
    border: none;
    font-size: 14pt;
    line-height: 100%;
    height: 28px;
    background-color: gray;
    padding: 4px 20px;
    color: white;
    width: 180px;
  }
  button:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 28px;
  }
  button:last-child {
    border-top-left-radius: 28px;
    border-top-right-radius: 5px;
  }
  button:hover {
  }
  button.active {
    background-color: orange;
  }
`;

export default Restrict;
