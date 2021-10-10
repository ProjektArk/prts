import cx from 'classnames';
import styled from 'styled-components';
import { useGlobal } from '../hooks/global';
import MainImage from '../images';

const MenuButton = (props) => {
  const { menu, setMenu } = useGlobal();
  return (
    <a
      className={cx(['menu-a'], { active: menu == props.to })}
      onClick={() => setMenu(`/${props.to.replaceAll('/', '')}`)}
      style={props.to == '/' ? { textDecoration: 'unset' } : {}}
      {...props}
      aria-hidden
    >
      {props.children}
    </a>
  );
};
const Link = (props) => {
  const { src, title, href } = props;
  return (
    <div
      onClick={() => {
        window.open(href, '_blank');
      }}
      aria-hidden
    >
      <img src={src} alt="" />
      {title}
    </div>
  );
};
const Header = () => {
  const { setMenu } = useGlobal();
  return (
    <header>
      <div className="header-menu">
        <img
          className="title-logo"
          src={MainImage.title}
          onClick={() => setMenu(`/`)}
          alt=""
          style={{ cursor: 'pointer' }}
          aria-hidden
        />
        <MenuButton to="/create">작전 생성</MenuButton>
        <MenuButton to="/record">작전 기록</MenuButton>
        <MenuButton to="/developers">개발자들</MenuButton>
        <MenuButton to="/guide">사용 가이드</MenuButton>
      </div>
      <StyledLinks>
        <Link
          src={require('../images/icons/arknights.png').default}
          href="https://www.arknights.kr/"
          title={<span>공식사이트</span>}
        />
        <Link
          src={require('../images/icons/naver.png').default}
          href="https://cafe.naver.com/arknightskor"
          title={<span>네이버 공캎</span>}
        />
        <Link
          src={require('../images/icons/dc.png').default}
          href="https://gall.dcinside.com/mgallery/board/lists?id=mibj"
          title={<span>명갤</span>}
        />
        <Link
          src={require('../images/icons/dc.png').default}
          href="https://gall.dcinside.com/mgallery/board/lists?id=hypergryph"
          title={<span>노인정</span>}
        />
      </StyledLinks>
    </header>
  );
};

const StyledLinks = styled.div`
  padding-right: 10%;
  div {
    text-align: center;
    position: relative;
    display: inline-block;
    width: 45px;
    padding: 10px 10px;
  }
  span {
    color: white;
    font-size: 12px;
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    cursor: pointer;
  }
  img {
    width: 100%;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 15px;
  }
`;
export default Header;
