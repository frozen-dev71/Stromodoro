import classes from './Category.module.scss';
import icons from '../../assets/icons.svg';
import { taskCategories as categories } from '../../helpers/config';
import { Link } from 'react-router-dom';
import React from 'react';

const Category = props => {
  const category = categories.find(category => category.name === props.name);

  return (
    <li>
      <Link to={`?sort=${category.name}`} className={classes.category}>
        <div className={classes.category__icon}>
          <svg>
            <use href={`${icons}${category.icon}`}></use>
          </svg>
        </div>
        <span>{category.name}</span>
      </Link>
    </li>
  );
};

export default React.memo(Category);
