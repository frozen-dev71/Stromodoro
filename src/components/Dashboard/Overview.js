
import Card from '../UI/Card';
import { useSelector } from 'react-redux';

const OverviewCard = ({ metric, label }) => {
  return (
    <li>
      <span className={classes.overview__metric}>{metric}</span>
      <span className={classes.overview__description}>{label}</span>
    </li>
  );
};

