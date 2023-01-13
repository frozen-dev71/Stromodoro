import React, { useState, Fragment, useEffect } from 'react';


/* Secondary component for the chart, returns a dot and a corresponding line
and performs calculations to find out the length and the angle of the line*/
const DataPoint = React.memo(props => {
  const { left, hasLine, bottom, nextPointValue, base, label } = props;
  const perpendicular = (nextPointValue - bottom) * 10; //height of the imaginary right triangle built to help calculate the hypotenuse
  //the base is received via props as the distance between two points on x axis
  const hours = Math.trunc(bottom);
  const minutes = Math.round((bottom * 60) % 60);
  return (
    <div className={classes.datagroup}>
      <div
        className={classes.point}
        data-value={`${hours}h${minutes}m`}
        style={{
          left: left,
          bottom: `${bottom * 10}px`,
          transform: `${
            bottom === 0 ? 'translate(-50%, 25%)' : 'translate(-50%, 50%)' //avoid overlapping when no data
          }`,
        }}
      ></div>
      {hasLine && (
        <div
          className={classes.line}
          style={{
            width: `${Math.sqrt(
              base * base + perpendicular * perpendicular
            )}px`, // this calculates the width of the line to reach the next point (Pitagora)
            left: left,
            bottom: `${bottom * 10}px`,
            transform: `rotate(${perpendicular > 0 ? '-' : ''}${
              (Math.atan(Math.abs(perpendicular) / base) * 180) / Math.PI
            }deg)`, // this calculates the angle of the line to reach the next point (reverse tangent and sign choice - if next value is greater or not, this decides the sign)
          }}
        ></div>
      )}
      <div className={classes.label} style={{ left: left }}>
        {label}
      </div>
    </div>
  );
});

// Secondary component that renders the y-axis values
const Divisions = React.memo(({ maxValue, unit }) => {
  const distanceBetweenDivisions = maxValue / 6;
  const divisionsArray = [];
  for (
    let i = distanceBetweenDivisions;
    i <= maxValue;
    i += distanceBetweenDivisions
  ) {
    divisionsArray.push(i);
  }

  return (
    <Fragment>
      {divisionsArray.map((value, i) => (
        <div
          key={i}
          className={classes.division}
          style={{ bottom: `${value * 10}px` }}
        >
          {`${value}${unit}`}
        </div>
      ))}
    </Fragment>
  );
});

