import { fromJS, Set } from 'immutable';
import React from 'react';
import styled from 'styled-components';
import operatorsMaster from '../../static/database/master/operators.json';

const RestrictObj = (props) => {
  const { restrict, getExpectedOpers, onClick } = props;
  const [operatorMaster] = React.useState(fromJS(operatorsMaster));

  const getOperatorIds = React.useCallback(() => {
    const operatorsByPosition = getExpectedOpers().filter((operator_id) => {
      const foundOperator = operatorMaster.find((item) => item.get('id') == operator_id);
      return foundOperator.get('position_id') == restrict.getIn(['restrict', 'position']);
    });
    const operatorsByRarity = getExpectedOpers().filter((operator_id) => {
      const foundOperator = operatorMaster.find((item) => item.get('id') == operator_id);
      return foundOperator.get('rarity') == restrict.getIn(['restrict', 'rarity']);
    });
    const operatorsByRestrict = Set.intersect([
      new Set(restrict.getIn(['restrict', 'operators'])),
      new Set(getExpectedOpers()),
    ]);

    return new Set(
      operatorsByRestrict.concat(operatorsByRarity).concat(operatorsByPosition),
    ).toList();
  }, [getExpectedOpers, operatorMaster, restrict]);

  return (
    <Styled>
      <div className="img-div">
        <img
          src={
            require('../../images/icons/icon_disadvantage/icon_disadvantage_sniperonly.png').default
          }
          alt=""
        />
      </div>
      <div className="contents-div">
        <span className="question-mark">？</span>
        <div>
          <span className="name">{restrict.get('name')}</span>
        </div>
        <div>
          <button onClick={() => onClick(getOperatorIds())}>선택</button>
        </div>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  width: 105px;
  height: 54px;
  padding: 4px 8px 10px 2px;
  display: inline-block;
  font-size: 7pt;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: #3d3d3d;
  opacity: 0.8;
  margin: 5px;
  word-break: keep-all;
  .img-div {
    width: 50%;
    display: inline-block;
  }
  .contents-div {
    height: 100%;
    width: 50%;
    display: inline-block;
  }
  .img-div img {
    width: 48px;
    padding-right: 5px;
    border-right: 1px solid gray;
  }
  .question-mark {
    float: right;
    padding: 0px 2px 0px 2px;
    font-size: 3pt;
    background-color: white;
    border-radius: 20px;
    color: black;
    cursor: pointer;
  }
  .name {
    padding: 3px 0px 3px 12px;
    font-size: 3pt;
    float: right;
    text-align: center;
  }
  button {
    float: right;
    cursor: pointer;
    font-size: 8pt;
    border-radius: 5px;
    border: 0;
    padding: 0;
    width: 35px;
    margin-right: 2px;
  }
`;
export default RestrictObj;
