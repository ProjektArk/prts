const QuestionMark = (props) => (
  <span
    style={{
      lineHeight: '100%',
      position: 'absolute',
      borderRadius: '10px',
      backgroundColor: 'white',
      color: 'black',
      padding: '1px 2px 4px 2px',
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
