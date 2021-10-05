const Developers = () => (
  <>
    <div className="content dev">
      <div className="dev-title">Projekt A. R. K.</div>
      <div className="dev-content">
        <Item job="UI / UX" username="그런건가" url="https://www.naver.com" />
        <Item job="Web Developer" username="너는..." url="https://www.google.com" />
        <Item job="Web Developer" username="몰라도 된다" url="https://www.daum.net" />
        <Item job="App Developer" username="때가 아니다" url="https://www.youtube.com" />
      </div>
    </div>
  </>
);

const Item = (props) => (
  <>
    <div>{'♥ ' + props.job}</div>
    <div>{props.username}</div>
    <div>
      <a href={props.url}>Contact</a>
    </div>
  </>
);

export default Developers;
