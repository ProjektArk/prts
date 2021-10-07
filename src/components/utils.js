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
  const nowDate = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }).split(' ')[1];

  const remainHour = 23 - Number(nowDate.split(':')[0]);
  const remainMinute = 60 - Number(nowDate.split(':')[1]);
  const remainSecond = 60 - Number(nowDate.split(':')[2]);

  return `${zeroFill(remainHour)}:${zeroFill(remainMinute)}:${zeroFill(remainSecond)}`;
};
