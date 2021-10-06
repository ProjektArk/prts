import _ from 'lodash';

const Img = (props) => {
  const { src, alt } = props;
  console.log(src, alt);
  return (
    <img
      src={require(`../../images/${_.get(src, 0) === '/' ? src.slice(1) : src}`).default}
      alt={alt}
    />
  );
};
export default Img;
