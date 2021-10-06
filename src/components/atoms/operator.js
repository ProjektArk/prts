import styled from 'styled-components';
import _ from 'lodash';
import positions from '../../static/database/master/positions.json';
import { getRestrictScore } from '../static';

const Operator = (props) => {
  const { operator, onMouseEnter, ...otherProps } = props;
  return (
    <StyledOperator
      onMouseEnter={() =>
        onMouseEnter(`이름: ${operator.get('name')}
          포지션: ${positions.find((position) => position.id == operator.get('position_id')).name}
          레어도: ${_.range(operator.get('rarity'))
            .map(() => '⭐️')
            .join('')}
          가중치: ${operator.get('weight')}점
          -------------------
          총 제약점수: ${getRestrictScore([operator.get('id')])}점`)
      }
      {...otherProps}
    >
      <div>
        {_.get(
          positions.find((position) => position.id == operator.get('position_id')),
          'name',
        )}
      </div>
      <div>
        <img
          src={require('../../images/icons/icon_ui/icon_caster.png').default}
          alt=""
          aria-hidden
        />
      </div>
      <div className="name">{operator.get('name')}</div>
    </StyledOperator>
  );
};

const StyledOperator = styled.div`
  vertical-align: top;
  ${({ small }) =>
    small
      ? 'width: 48px; min-height: 60px; max-height: 80px; font-size: 10px;'
      : 'width: 75px; min-height: 80px; max-height: 100px; font-size: 12px;'}
  padding: 6px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid transparent;
  :hover {
    border: 1px solid;
  }
  div:first-child {
    margin-bottom: 5px;
    background-color: white;
    color: black;
    border-radius: 8px;
    padding: 0px 4px;
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

export default Operator;
