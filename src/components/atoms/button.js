import styled from 'styled-components';
import cx from 'classnames';

export const ButtonGroup = (props) => {
  const { items, value, setValue, ...otherProps } = props;
  return (
    <StyledButtonGroup {...otherProps}>
      {items?.map((item) => (
        <button
          id={item.id}
          key={item.id}
          className={cx({ active: item.id == value })}
          onClick={(e) => {
            setValue(e.target.id);
          }}
        >
          {item.name}
        </button>
      ))}
    </StyledButtonGroup>
  );
};

export const ButtonWithOrder = (props) => {
  const { id, order, children, ...otherProps } = props;
  return (
    <>
      <StyledButtonWithOrder id={id} {...otherProps}>
        {children}
        {order.get('target') == id && (
          <img
            id={id}
            className={cx({ reverse: order.get('desc') })}
            src={require('../../images/icons/icon_ui/icon_ui_dropdown.png').default}
            alt=""
          />
        )}
      </StyledButtonWithOrder>
    </>
  );
};
const StyledButtonWithOrder = styled.button`
  background-color: gray;
  color: white;
  border-radius: 15px;
  padding: 3px 8px;
  border: 0px;
  cursor: pointer;
  line-height: 100%;
  font-size: 9pt;
  margin: 0px 3px;
  img {
    padding: 1px 0px 0px 4px;
    width: 9px;
  }
  img.reverse {
    transform: scaleY(-1);
  }
`;
const StyledButtonGroup = styled.div`
  button {
    background-color: gray;
    border: 0px;
    color: white;
    padding: 8px 10px;
    cursor: pointer;
    line-height: 100%;
    font-size: 11pt;
  }

  button:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  button:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  button:first-child:hover {
    background-color: #36a0f5;
  }
  button:last-child:hover {
    background-color: #ffbd87;
  }
  button:first-child.active {
    background-color: #2196f3;
  }

  button:last-child.active {
    background-color: orange;
  }
  button:not(:last-child) {
    border-right: none;
  }

  :after {
    content: '';
    clear: both;
    display: table;
  }
`;
