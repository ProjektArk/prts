import React from 'react';
import { fromJS, Set } from 'immutable';
import _ from 'lodash';
import cx from 'classnames';
import styled from 'styled-components';
import Box, { BoxItem } from '../../../atoms/box';
import { InputTextWithSearchMark } from '../../../atoms/input';
import QuestionMark from '../../../atoms/question-mark';
import { ButtonGroup, ButtonWithOrder } from '../../../atoms/button';
import Operator from '../../../atoms/operator';
import RestrictObj from '../../../atoms/restrictObj';
import operatorsData from '../../../../static/database/master/operators.json';
import restrictsData from '../../../../static/database/master/restricts.json';

const Restrict = (props) => {
  const { setting, setSetting } = props;
  const [operatorsMaster, setOperatorsMaster] = React.useState(fromJS(operatorsData));
  const [restrictsMaster, setRestrictMaster] = React.useState(fromJS(restrictsData));
  const [searchTab, setSearchTab] = React.useState('operator');
  const [mode, setMode] = React.useState('allowed');
  const [search, setSearch] = React.useState('');

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

  const getRestricts = React.useCallback(
    () =>
      search
        ? restrictsMaster.filter((restrict) => restrict.get('name').includes(search))
        : restrictsMaster,
    [restrictsMaster, search],
  );
  const getExpectedOpers = React.useCallback(() => {
    const expectedOpers = operatorsMaster
      .filter(
        (operator) =>
          !setting.getIn(['restrict', 'allowed']).includes(operator.get('id')) &&
          !setting.getIn(['restrict', 'disallowed']).includes(operator.get('id')),
      )
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

  const SelectedOpers = React.useCallback(
    ({ mode }) => (
      <Box height="40%" width="100%" long>
        <h3 className="t_center">{mode == 'allowed' ? '지정 오퍼레이터' : '금지 오퍼레이터'}</h3>
        <div className="mt_3" style={{ height: '80%', overflowY: 'auto' }}>
          {setting.getIn(['restrict', mode]).map((operator_id) => (
            <Operator
              key={operator_id}
              operator={operatorsMaster.find((operator) => operator.get('id') == operator_id)}
              onClick={() =>
                setSetting((prevState) =>
                  prevState.updateIn(['restrict', mode], (list) =>
                    list.filter((id) => id != operator_id),
                  ),
                )
              }
            />
          ))}
        </div>
      </Box>
    ),
    [operatorsMaster, setSetting, setting],
  );
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
              <QuestionMark move_down={-45} move_right={400} />
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
              <Box className="mt_4 " width="92%" height="75%">
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
                        setSetting((prevState) =>
                          prevState.updateIn(['restrict', mode], (list) =>
                            list.includes(operator_id) ? list : list.push(operator_id),
                          ),
                        );
                      }}
                    />
                  ))}
                </div>
              </Box>
            </BoxItem>
          )}
          {searchTab === 'restrict' && (
            <BoxItem long>
              <QuestionMark move_down={-45} move_right={400} />
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
              <Box className="mt_4 " width="92%" height="75%">
                {getRestricts().map((restrict) => (
                  <RestrictObj
                    key={restrict.get('id')}
                    restrict={restrict}
                    getExpectedOpers={getExpectedOpers}
                    onClick={(operator_ids) => {
                      operator_ids.size > 0 &&
                        setSetting((prevState) =>
                          prevState.updateIn(['restrict', mode], (list) => {
                            const result = new Set(list.concat(operator_ids));
                            return result.toList();
                          }),
                        );
                    }}
                  />
                ))}
              </Box>
            </BoxItem>
          )}
        </Box>
      </div>
      <div style={{ height: '463px', width: '40%', padding: '0px 30px' }}>
        <SelectedOpers mode="allowed" />
        <StyledButtons>
          <button
            onClick={() =>
              setSetting((prevState) => prevState.setIn(['restrict', 'allowed'], fromJS([])))
            }
          >
            상단 초기화
          </button>
          <button
            onClick={() =>
              setSetting((prevState) =>
                prevState
                  .setIn(['restrict', 'allowed'], fromJS([]))
                  .setIn(['restrict', 'disallowed'], fromJS([])),
              )
            }
          >
            모두 초기화
          </button>
          <button
            onClick={() =>
              setSetting((prevState) => prevState.setIn(['restrict', 'disallowed'], fromJS([])))
            }
          >
            하단 초기화
          </button>
        </StyledButtons>
        <SelectedOpers mode="disallowed" />
      </div>
    </div>
  );
};

const StyledTextWithSearchMark = styled.div`
  .btn-group {
    float: right;
  }
`;
const StyledButtons = styled.div`
  width: 100%;
  padding: 15px 15px;
  text-align: center;
  button {
    font-size: 10pt;
    line-height: 100%;
    border: 0px;
    padding: 8px 7px;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }
  button:first-child {
    border-bottom-left-radius: 20px;
    background-color: #2196f3;
    border-color: #2196f3;
    margin-right: 10px;
  }
  button: nth-child(2) {
    background-color: gray;
    border-color: gray;
  }
  button:last-child {
    border-top-right-radius: 20px;
    background-color: orange;
    border-color: orange;
    margin-left: 10px;
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
