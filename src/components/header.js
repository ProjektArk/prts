import { useGlobal } from '../hooks/global';
import MainImage from '../images';

const MenuButton = (props) => {
  const [, setGState] = useGlobal();
  return (
    <a
      className="menu-a"
      onClick={() =>
        setGState((prevState) => prevState.set('menu', `/${props.to.replaceAll('/', '')}`))
      }
      {...props}
      aria-hidden
    >
      {props.children}
    </a>
  );
};
const Header = () => (
  <header>
    <div className="header-menu">
      <MenuButton to="/">
        <img className="title-logo" src={MainImage.title} alt="" />
      </MenuButton>
      <MenuButton to="/create">작전 생성</MenuButton>
      <MenuButton to="/record">작전 기록</MenuButton>
      <MenuButton to="/developers">개발자들</MenuButton>
      <MenuButton to="/guide">사용 가이드</MenuButton>
    </div>
  </header>
);

export default Header;
