const Image = (props) => {
  const { src, alt } = props;
  return <img src={require('../../images/icons/icon_cha/' + src).default} alt={alt} />;
};

export default Image;
