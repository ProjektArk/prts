const Image = (props) => {
  const { src, alt } = props;
  return <img src={require(`../../images/${src}`).default} alt={alt} />;
};

export default Image;
