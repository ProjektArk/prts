const QuestionMark = (props) => (
  <span
    style={{
      lineHeight: '100%',
      position: 'absolute',
      borderRadius: '100%',
      backgroundColor: 'white',
      color: 'black',
      padding: '3px 2px 0px 4px',
      transform: `translate(${props.move_right || 10}px, ${props.move_down || 0}px)`,
      cursor: 'pointer',
      fontWeight: 'bold',
    }}
    {...props}
  >
    ？
  </span>
);

export default QuestionMark;
