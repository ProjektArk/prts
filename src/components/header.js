import { useGlobal } from '../hooks/global';
import MainImage from '../images';

const MenuButton = (props) => {
  const { setMenu } = useGlobal();
  return (
    <a
      className="menu-a"
      onClick={() => setMenu(`/${props.to.replaceAll('/', '')}`)}
      style={props.to == '/' ? { textDecoration: 'unset' } : {}}
      {...props}
      aria-hidden
    >
      {props.children}
    </a>
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
    </header>
  );
};
export default Header;
