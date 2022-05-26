import "./Card.css";

const Card = (props) => {
  const classes = "card " + props.className; // "card " : card다음 공백을 무조건 넣어주어야 함
  return <div className={classes}>{props.children}</div>;
};

export default Card;
