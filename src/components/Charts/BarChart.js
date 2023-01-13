import React, { Fragment } from 'react';


const findLabels = (distanceBetweenLabels, maxValue) => {

  const labelsValues = [];
  for (
    let i = distanceBetweenLabels;
    i <= maxValue;
    i += distanceBetweenLabels
  ) {
    labelsValues.push(i);
  }
  return labelsValues;
};

const Labels = React.memo(({ maxValue, unit }) => {

  const distanceBetweenLabels = maxValue / 6;
  const labelsValues = findLabels(distanceBetweenLabels, maxValue);

  return (
    <Fragment>
      {labelsValues.map((label, i) => (
        <div
          key={i}
          className={classes['y-label']}
          style={{ '--label-position': `${(label / maxValue) * 100}%` }}
        >
          {`${label} ${unit}`}
        </div>
      ))}
    </Fragment>
  );
});
