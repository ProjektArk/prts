import styled from 'styled-components';
import _ from 'lodash';
import React from 'react';
import positions from '../../static/database/master/positions.json';
import { getRestrictScore } from '../utils';

const OperatorObj = (props) => {
  const { operator, onMouseEnter, ...otherProps } = props;
  return (
    <StyledOperator
      onMouseEnter={() =>
        onMouseEnter(`이름: ${operator.get('name')}
          포지션: ${positions.find((position) => position.id == operator.get('position_id')).name}
          레어도: ${_.range(operator.get('rarity'))
            .map(() => '⭐️')
            .join('')}
          기본 코스트: ${operator.get('cost')}
          가중치: ${operator.get('weight')}점
          ------------------
          총 제약점수: ${getRestrictScore([operator.get('id')])}점`)
      }
      {...otherProps}
    >
      <div className="position">
        {_.get(
          positions.find((position) => position.id == operator.get('position_id')),
          'name',
        )}
      </div>
      <div>
        {operator.get('thumbnail') && (
          <img
            src={require(`../../images/icons/icon_cha/${operator.get('thumbnail')}`).default}
            alt=""
          />
        )}
      </div>
      <div className="name">{operator.get('name')}</div>
    </StyledOperator>
  );
};

const StyledOperator = styled.div`
  vertical-align: top;
  ${({ small }) =>
    small
      ? 'width: 52px; min-height: 60px; max-height: 80px;'
      : 'width: 75px; min-height: 80px; max-height: 100px;'}
  margin: 6px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid transparent;
  :hover {
    border: 1px solid;
  }
  .position {
    margin-bottom: 4px;
    background-color: white;
    color: black;
    border-radius: 8px;
    padding: 0px 4px;
    line-height: 150%;
    ${({ small }) => (small ? 'font-size: 10px;' : 'font-size: 12px;')}
  }
  div:last-child {
    margin-top: 2px;
  }
  div {
    text-align: center;
  }
  img {
    ${({ small }) => (small ? 'width: 30px;' : 'width: 40px;')}
  }
  .name {
    ${({ small }) => (small ? 'font-size: 10px;' : 'font-size: 12px;')}
  }
`;

export default OperatorObj;
