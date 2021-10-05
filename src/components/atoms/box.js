import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';

const Box = (props) => {
  const { height, width, title, children, className } = props;
  return (
    <StyledBox className={cx([className])} style={{ height, width }}>
      {title && (
        <div className="t_center mb_3">
          <h1>{title}</h1>
        </div>
      )}
      {children}
    </StyledBox>
  );
};

export const BoxItem = (props) => (
  <div
    className={cx([
      'd_ib',
      props.long ? 'w_100' : 'w_50',
      'h_100',
      'v_sub',
      props.center && 't_center',
    ])}
  >
    {props.title && <h3>{props.title}</h3>}
    {props.children}
  </div>
);

const StyledBox = styled.div`
  display: inline-block;
  color: white;
  background-color: var(--black-bg-color);
  border: 2px solid var(--white-line-color);
  border-radius: 20px;
  padding: 15px;

  div::-webkit-scrollbar {
    width: 10px;
  }
`;
export default Box;
