import { fromJS, Set } from 'immutable';
import React from 'react';
import styled from 'styled-components';
import operatorsMaster from '../../static/database/master/operators.json';

const RestrictObj = (props) => {
  const { restrict, getExpectedOpers, onClick, onMouseEnter } = props;
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
    <Styled
      onMouseEnter={() =>
        onMouseEnter(`${restrict.get('title')}

  ${restrict.get('description') ? restrict.get('description') : ''}
  `)
      }
    >
      <div className="img-div">
        <img
          src={
            require('../../images/icons/icon_disadvantage/icon_disadvantage_sniperonly.png').default
          }
          alt=""
        />
      </div>
      <div className="contents-div">
        <span className="score">{restrict.get('score')}</span>
        <div className="name">{restrict.get('name')}</div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => onClick(getOperatorIds())}>선택</button>
        </div>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  width: 100px;
  height: 52px;
  padding: 4px 8px 4px 2px;
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
    position: relative;
  }
  .img-div img {
    width: 48px;
    padding-right: 5px;
    border-right: 1px solid gray;
  }
  .score {
    position: absolute;
    top: -1px;
    right: -5px;
    padding: 1px 4px 0px 5px;
    font-size: 3pt;
    background-color: white;
    border-radius: 20px;
    color: black;
    cursor: pointer;
  }
  .name {
    position: absolute;
    top: 16px;
    left: 12px;
    font-size: 3pt;
    float: right;
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 100%;
    word-break: break-all;
    cursor: default;
  }
  button {
    position: absolute;
    top: 38px;
    right: -6px;
    cursor: pointer;
    font-size: 8pt;
    border-radius: 7px;
    border: 0;
    padding: 1px 0px;
    width: 40px;
    margin-right: 2px;
    background-color: gray;
  }
`;
export default RestrictObj;
