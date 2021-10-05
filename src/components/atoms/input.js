import React from 'react';
import styled from 'styled-components';
import { ButtonGroup } from './button';

export const InputText = (props) => <StyledText type="text" className="input-text" {...props} />;
export const InputSlider = (props) => (
  <StyledSlider>
    <input type="range" {...props} />
  </StyledSlider>
);
export const InputTogglebox = (props) => (
  <StyledTogglebox>
    <input type="checkbox" {...props} />
    <span className="slider round" />
  </StyledTogglebox>
);
export const InputCheckbox = (props) => (
  <StyledCheckbox>
    {props.title}
    <input type="checkbox" {...props} />
    <span />
  </StyledCheckbox>
);
export const InputTextWithSearchMark = (props) => {
  const { reset, ...otherProps } = props;
  return (
    <StyledTextWithSearchMark>
      <img
        width="20"
        src={require('../../images/icons/icon_ui/icon_ui_search.png').default}
        alt=""
      />
      <input type="text" {...otherProps} />
      {otherProps.value && (
        <span onClick={reset} aria-hidden>
          ✕
        </span>
      )}
    </StyledTextWithSearchMark>
  );
};
const StyledTextWithSearchMark = styled.div`
  display: unset;
  input[type='text'] {
    color: white;
    background-color: #4a4a4a;
    border-radius: 30px;
    border: 1px solid gray;
    padding: 5px 10px 5px 40px;
    line-height: 100%;
    font-size: 12pt;
    width: 45%;
  }
  img {
    position: absolute;
    transform: translate(8px, 5px);
  }
  span {
    cursor: pointer;
    position: absolute;
    transform: translate(-25px, 0px);
    font-size: 15pt;
  }
`;
const StyledCheckbox = styled.label`
  padding: 1px 20px 0px 22px;
  margin: 5px 0px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: 10pt;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 100%;

  :hover input ~ span {
    background-color: #ccc;
  }

  input:checked ~ span:after {
    display: block;
  }
  input:checked ~ span {
    background-color: #2196f3;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  span {
    position: absolute;
    top: -1px;
    left: 0px;
    height: 14px;
    width: 14px;
    background-color: #eee;
    border-radius: 4px;
  }
  span:after {
    content: '';
    position: absolute;
    display: none;
    left: 4px;
    top: 1px;
    width: 3px;
    height: 7px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
const StyledText = styled.input`
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 3px 10px;
  line-height: 1.5;
`;
const StyledSlider = styled.div`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 5px;

  input {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.1s;
    transition: opacity 0.1s;
  }

  input:hover {
    opacity: 1;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #2196f3;
    cursor: pointer;
  }

  input::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #2196f3;
    cursor: pointer;
  }
`;
const StyledTogglebox = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;
