import _ from 'lodash';
import operatorData from '../static/database/master/operators.json';

export const randomTitles = [
  '에델바이스',
  '이베리아 회랑',
  '크루세이더',
  '도미노',
  '엔테베',
  '예리코',
  '다운폴',
  '코로넷',
  '결호',
  '천호',
  '사막의 폭풍',
  '내재된 결단',
  '카시미어의 새벽',
  '무뢰',
  '하얀 날개',
  '신속한 분노',
  '금계',
  '버마재비',
  '단호한 결단',
  '다이나모',
  '볼레로',
  '혜성',
  '불굴',
  '백일몽',
  '빛의 속도',
  '크리스탈라이즈',
  '레퀴엠',
  '그리핀',
  '님로드',
  '몰락',
  '마켓 가든',
  '맹조의 발톱',
  '바그라티온',
  '바르바로사',
  '발키리',
  '프리퀀트 윈드',
  '페어웨이',
];

export const initSetting = {
  default: {
    name: '',
    operatorLimit: 1,
    isGlobal: false,
    map: {
      mainStory: [],
      resource: [],
      event: [],
    },
    title: '',
  },
  restrict: [],
  additional: {},
  score: 0,
  created_at: 0,
};

export const rarityScore = {
  1: 1,
  2: 3,
  3: 6,
  4: 10,
  5: 15,
  6: 21,
};

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
