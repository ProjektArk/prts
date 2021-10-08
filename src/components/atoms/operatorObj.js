import styled from 'styled-components';
import cx from 'classnames';
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
      <div className="star">
        <span>{_.range(operator.get('rarity')).map(() => '★')}</span>
      </div>
      <div className="background">
        <div className={cx([`r${operator.get('rarity')}`])}></div>
      </div>
      <div className="name">{operator.get('name')}</div>
    </StyledOperator>
  );
};

const StyledOperator = styled.div`
  vertical-align: top;
  ${({ small }) =>
    small
      ? 'width: 60px; min-height: 60px; max-height: 80px;'
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
    ${({ small }) =>
      small ? 'width: 30px; padding-bottom: 4px;' : 'width: 40px; padding-bottom: 5px;'}
  }
  .name {
    ${({ small }) => (small ? 'font-size: 10px;' : 'font-size: 12px;')}
  }
  .star {
    position: relative;
    span {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 0;
      color: yellow;
      text-shadow: 0px 0px 3px black;
      ${({ small }) =>
        small ? 'font-size: 10px; bottom: -3px;' : 'font-size: 12px; bottom: -4px;'}
    }
  }
  .background {
    position: relative;
    div {
      position: absolute;
      width: 100%;
      top: -4px;
      ${({ small }) => (small ? 'height: 18px;' : 'height: 20px;')}
      &.r6 {
        background: linear-gradient(var(--rarity-6-color), transparent);
      }
      &.r5 {
        background: linear-gradient(var(--rarity-5-color), transparent);
      }
      &.r4 {
        background: linear-gradient(var(--rarity-4-color), transparent);
      }
      &.r3 {
        background: linear-gradient(var(--rarity-3-color), transparent);
      }
      &.r2 {
        background: linear-gradient(var(--rarity-2-color), transparent);
      }
      &.r1 {
        background: linear-gradient(var(--rarity-1-color), transparent);
      }
    }
  }
`;

export default OperatorObj;
