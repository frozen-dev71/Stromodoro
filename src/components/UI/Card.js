import classes from './Card.module.scss';

const Card = props => {
  return (
    <section className={`${classes.card} ${props.className}`}>
      {props.children}
    </section>
  );
};

export default Card;
