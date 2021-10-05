import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import Box, { BoxItem } from '../../../atoms/box';
import QuestionMark from '../../../atoms/question-mark';
import { InputTogglebox, InputSlider, InputText, InputCheckbox } from '../../../atoms/input';
import mainStoryMap from '../../../../static/database/combat/map/mainStory.json';
import resourceMap from '../../../../static/database/combat/map/resource.json';
import eventMap from '../../../../static/database/combat/map/event.json';

const Default = (props) => {
  const { setting, setSetting } = props;

  const handleSetting = React.useCallback(
    ({ target }) => {
      const { id, value, type, checked } = target;

      setSetting((prevState) =>
        prevState.setIn(id.split('.'), type === 'checkbox' ? checked : value),
      );
    },
    [setSetting],
  );

  const AccordionItem = React.useCallback((props) => {
    const { title, children } = props;
    return (
      <div className="mb_2">
        <button
          onClick={(e) => {
            e.currentTarget.classList.toggle('active');
            e.currentTarget.nextSibling.classList.toggle('panel');
          }}
        >
          {title}
          <span>
            <img
              width="18"
              src={require('../../../../images/icons/icon_ui/icon_ui_gear.png').default}
              alt=""
            />
          </span>
        </button>
        <div className="panel">{children}</div>
      </div>
    );
  }, []);

  const BoxThumbnail = React.useCallback(
    (props) => {
      const { width, item, ...otherProps } = props;
      return (
        <img
          alt=""
          aria-hidden
          src={require(`../../../../images/${item}`).default}
          width={width ? `${width}px` : '40px'}
          className={cx([
            'm_1',
            'c_pointer',
            setting.getIn(['default', 'signImage']) === item && 'border',
          ])}
          onClick={() => setSetting((prevState) => prevState.setIn(['default', 'signImage'], item))}
          style={{ border: '1px solid transparent' }}
          {...otherProps}
        />
      );
    },
    [setSetting, setting],
  );

  return (
    <div className="d_if w_100">
      <div style={{ height: '470px', width: '60%', paddingRight: '30px' }}>
        <Box height="26%" width="100%" className="mb_4 d_if">
          <BoxItem title="당신의 이름은?">
            <InputText
              id="default.name"
              value={setting.getIn(['default', 'name'])}
              onChange={(e) => {
                e.target.value.length < 9 && handleSetting(e);
              }}
              className="mt_1 mb_1"
            />
            <h6>최대 8글자까지 가능합니다.</h6>
          </BoxItem>
          <BoxItem title="결제도장" center>
            <BoxThumbnail item="icon_ARK.png" />
            <BoxThumbnail item="icon_donkey.png" />
            <BoxThumbnail item="icon_minaselogo.png" />
            <QuestionMark
              move_right={15}
              move_down={15}
              onClick={() => {
                console.log('clicked');
              }}
            />
            <h6>원하는 이미지를 선택해 주세요.</h6>
          </BoxItem>
        </Box>
        <Box height="15%" width="100%" className="mt_4 mb_4">
          <BoxItem>
            <h1>글로벌 서버</h1>
          </BoxItem>
          <BoxItem center>
            <InputTogglebox
              id="default.isGlobal"
              checked={setting.getIn(['default', 'isGlobal'])}
              onChange={handleSetting}
            />
            <QuestionMark
              move_right={20}
              move_down={7}
              onClick={() => {
                console.log('clicked');
              }}
            />
          </BoxItem>
        </Box>
        <Box height="26%" width="100%" className="mt_4">
          <BoxItem title="분대 편성 수 제한">
            <InputSlider
              id="default.operatorLimit"
              value={setting.getIn(['default', 'operatorLimit']) || 0}
              min={1}
              max={12}
              onChange={handleSetting}
            />
          </BoxItem>
          <BoxItem center>
            <img
              src={
                require(`../../../../images/icons/icon_disadvantage/icon_disadvantage_${`0${setting.getIn(
                  ['default', 'operatorLimit'],
                )}`.slice(-2)}operater.png`).default
              }
              alt=""
              width="60px"
              className="m_1"
            />
            <QuestionMark
              move_right={20}
              move_down={22}
              onClick={() => {
                console.log('clicked');
              }}
            />
          </BoxItem>
        </Box>
      </div>
      <div style={{ height: '463px', width: '40%', padding: '0px 30px' }}>
        <Box height="100%" width="100%" title="작전 설정">
          <BoxItem long>
            <div className="h_100 w_100 t_center">
              <QuestionMark move_right={115} move_down={-40} />
              <StyledAccordion>
                {[
                  { id: 'mainStory', title: '메인 스토리', maps: mainStoryMap },
                  { id: 'resource', title: '물자 비축', maps: resourceMap },
                  { id: 'event', title: '이벤트', maps: eventMap },
                ].map((item, index) => (
                  <div key={`${item.id}_${item.name}`}>
                    <AccordionItem key={item.id} title={item.title} index={index + 1}>
                      {item.maps.map((map) =>
                        map.id == -1 ? (
                          <div key={map.name} className="t_center mt_2">
                            <span>{map.name}</span>
                            <hr className="w_50" />
                          </div>
                        ) : (
                          <InputCheckbox
                            key={map.id}
                            id={`default.map.${item.id}`}
                            title={map.name}
                            checked={setting.getIn(['default', 'map', item.id]).includes(map.id)}
                            onChange={() =>
                              setSetting((prevState) => {
                                const getMaps = prevState.getIn(['default', 'map', item.id]);
                                return prevState.setIn(
                                  ['default', 'map', item.id],
                                  getMaps.includes(map.id)
                                    ? getMaps.filter((id) => id != map.id)
                                    : getMaps.push(map.id),
                                );
                              })
                            }
                          />
                        ),
                      )}
                    </AccordionItem>
                    {index < 2 && <hr />}
                  </div>
                ))}
              </StyledAccordion>
            </div>
          </BoxItem>
        </Box>
      </div>
    </div>
  );
};
const StyledAccordion = styled.div`
  button {
    background-color: transparent;
    color: white;
    cursor: pointer;
    padding: 10px 15px 10px 15px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    font-size: 13pt;
  }
  button span {
    float: right;
    transform: translateY(2px);
  }
  .active,
  button:hover {
    background-color: gray;
  }
  .panel {
    padding: 0 18px;
    background-color: white;
    display: none;
    overflow: hidden;
  }
`;
export default Default;
