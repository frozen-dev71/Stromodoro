import Card from '../UI/Card';
import classes from './Categories.module.scss';
import Category from './Category';
import React from 'react';

const Categories = () => {
  return (
    <Card className={classes.categories}>
      <h2>Filter by</h2>
      <ul>
        <Category name="Show All" />
        <Category name="Completed" />
      </ul>
      <ul>
        <Category name="Work" />
        <Category name="Study" />
        <Category name="Exercise" />
        <Category name="Health" />
        <Category name="Wellness" />
        <Category name="Chores" />
      </ul>
    </Card>
  );
};

export default React.memo(Categories);
