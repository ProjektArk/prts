import { fromJS } from 'immutable';
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
  const { ...otherProps } = props;
  const string = Object.keys(otherProps).map(
    (key) => `${key}: ${_.get(otherProps, key)} !important`,
  );
  return `${string.join(';')};`;
};

export const getRemainTimer = () => {
  const japanStandardTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  const time = japanStandardTime.split(':');
  const remainHour = 23 - Number(_.get(time, 0) == '24' ? 0 : _.get(time, 0));
  const remainMinute = 59 - Number(_.get(time, 1));
  const remainSecond = 59 - Number(_.get(time, 2));

  return `${zeroFill(remainHour)}:${zeroFill(remainMinute)}:${zeroFill(remainSecond)}`;
};

export const getRandomizedOpers = (setting) => {
  const allOperatorIds = fromJS(operatorData.map((operator) => operator.id));
  const subtracted = allOperatorIds.toSet().subtract(setting.get('restrict').toSet()).toList();

  const randomOpers = [];

  if (subtracted.size <= setting.getIn(['default', 'operatorLimit'])) {
    subtracted.forEach((item) => randomOpers.push(item));
  } else {
    while (randomOpers.length < setting.getIn(['default', 'operatorLimit'])) {
      const randomIndex = _.random(subtracted.size - 1);
      const gotRandomOper = subtracted.get(randomIndex);
      if (!randomOpers.includes(gotRandomOper)) {
        randomOpers.push(gotRandomOper);
      }
    }
  }

  return randomOpers;
};
