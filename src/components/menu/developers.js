import styled from 'styled-components';
import Img from '../atoms/img';

const developers = [
  {
    job: 'UI / UX',
    name: 'projekt ARK',
    contact: { gallog: '', youtube: '', twitter: '', facebook: '', email: '' },
  },
  {
    job: 'Web Developer',
    name: '노예1호',
    contact: {
      gallog: 'https://gallog.dcinside.com/curykula',
      youtube: 'https://www.youtube.com/channel/UCjFAlvXPau-MDj_LO0s1_0Q',
      twitter: 'asdf',
      facebook: 'asdf',
      email: 'asdf',
    },
  },
  {
    job: 'Web Developer',
    name: 'wzrabbit',
    contact: {
      gallog: 'https://gallog.dcinside.com/example_address',
      youtube: '',
      twitter: '',
      facebook: '',
      email: '',
    },
  },
  {
    job: 'Infra',
    name: '인프라',
    contact: { gallog: '', youtube: '', twitter: '', facebook: '', email: '' },
  },
];
const Item = (props) => {
  const {
    developer: { job, name, contact },
  } = props;
  const A = (props) =>
    props.href ? (
      <div>
        <a href={props.href} target="_blank" rel="noreferrer">
          {props.gallog && <Img src="/icons/dc.png" alt={props.href} />}
          {props.youtube && <Img src="/icons/youtube.png" alt={props.href} />}
          {props.twitter && <Img src="/icons/twitter.png" alt={props.href} />}
          {props.facebook && <Img src="/icons/facebook.png" alt={props.href} />}
          {props.email && <Img src="/icons/email.png" alt={props.href} />}
        </a>
      </div>
    ) : (
      <></>
    );
  return (
    <StyledItem>
      <div className="job">
        <span>{`♥ ${job}`}</span>
      </div>
      <div className="name">
        <span>{name}</span>
      </div>
      <div className="contact">
        <A href={contact.gallog} gallog />
        <A href={contact.youtube} youtube />
        <A href={contact.twitter} twitter />
        <A href={contact.facebook} facebook />
        <A href={contact.email} email />
      </div>
    </StyledItem>
  );
};
const Developers = () => (
  <>
    <div className="content-deco-1" />
    <div className="content-deco-2" />
    <div className="content dev">
      <div className="dev-title">Projekt A. R. K.</div>
      <Styled>
        {developers.map((developer) => (
          <Item key={developer.name} developer={developer} />
        ))}
      </Styled>
    </div>
  </>
);
const Styled = styled.div`
  padding: 30px 0px;
  height: 300px;
`;
const StyledItem = styled.div`
  div {
    text-align: left;
    display: inline-block;
    font-size: 25pt;
    padding: 15px 10px;
    line-height: 100%;
    vertical-align: middle;
  }
  .job {
    width: 30%;
  }
  .name {
    width: 20%;
  }
  .contact {
    width: 30%;
    height: 40px;
    vertical-align: middle;
    display: inline-block;
    & span {
      font-size: 15pt;
    }
    & div {
      height: 100%;
      padding: 0;
    }
    & img {
      width: 30px;
      margin-right: 10px;
    }
  }
`;

export default Developers;
