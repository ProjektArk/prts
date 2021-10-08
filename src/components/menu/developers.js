import styled from 'styled-components';
import Img from '../atoms/img';
import developers from '../../static/database/developers';

const Item = (props) => {
  const {
    developer: { job, name, contact },
  } = props;
  const A = (props) =>
    props.href ? (
      <div>
        <a href={props.href} target="_blank" rel="noreferrer">
          {props.gallog && <Img src="icons/dc.png" alt={props.href} />}
          {props.youtube && <Img src="icons/youtube.png" alt={props.href} />}
          {props.twitter && <Img src="icons/twitter.png" alt={props.href} />}
          {props.facebook && <Img src="icons/facebook.png" alt={props.href} />}
        </a>

        {props.email && (
          <StyledEmail>
            <Img src="icons/email.png" alt={props.href} />
            <span>{props.href}</span>
          </StyledEmail>
        )}
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
const StyledEmail = styled.div`
  border: 1px solid gray;
  border-radius: 25px;
  padding: 0px 10px !important;
  height: 34px !important;
  span {
    vertical-align: top;
    font-size: 12px;
  }
  img {
    padding-bottom: 4px;
  }
`;
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
    width: 25%;
  }
  .name {
    width: 25%;
  }
  .contact {
    width: 40%;
    height: 30px;
    display: inline-block;
    & div {
      height: 100%;
      padding: 0;
    }
    & img {
      width: 20px;
      margin-right: 10px;
    }
  }
`;

export default Developers;
