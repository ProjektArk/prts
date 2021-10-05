import styled from 'styled-components';
import _ from 'lodash';
import positions from '../../static/database/master/positions.json';
const Operator = (props) => {
  const { operator, onClick } = props;

  return (
    <StyledOperator onClick={onClick}>
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
  width: 75px;
  min-height: 80px;
  max-height: 100px;
  padding: 6px;
  display: inline-block;
  font-size: 8pt;
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
    width: 40px;
  }
  .name {
    font-size: 11pt;
  }
`;

export default Operator;
