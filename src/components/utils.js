import _ from 'lodash';
import operatorData from '../static/database/master/operators.json';
import { rarityScore } from './static';

export const zeroFill = (str) => `0${str}`.slice(-2);
export const getRestrictScore = (operator_ids) => {
  const operators = operatorData.filter((operator) => operator_ids.includes(operator.id));
  return (
    (operators.length > 0 &&
      operators
        .map((operator) => _.get(rarityScore, operator.rarity) * operator.weight)
        .reduce((prev, current) => prev + current)) ||
    0
  );
};

export const applyStyleProps = (props) => {
  const { children, theme, ...otherProps } = props;
  const string = Object.keys(otherProps).map(
    (key) => `${key}: ${_.get(otherProps, key)} !important`,
  );
  return `${string.join(';')};`;
};

export const getRemainTimer = () => {
  const japanStandardTime = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
  const l = new Date(japanStandardTime);

  const remainHour = 23 - l.getHours();
  const remainMinute = 59 - l.getMinutes();
  const remainSecond = 59 - l.getSeconds();

  return `${zeroFill(remainHour)}:${zeroFill(remainMinute)}:${zeroFill(remainSecond)}`;
};