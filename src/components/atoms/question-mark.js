import questionImg from '../../images/icons/icon_ui/icon_ui_questionmark-bg.png';

const QuestionMark = (props) => (
  <img
    src={questionImg}
    style={{
      position: 'absolute',
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      transform: `translate(${props.move_right || 10}px, ${props.move_down || 0}px)`,
    }}
    alt="도움말"
    {...props}
    aria-hidden
  />
);
export default QuestionMark;
