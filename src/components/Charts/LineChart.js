import React, { useState, Fragment, useEffect } from 'react';
import classes from './LineChart.module.scss';

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

const LineChart = ({ data, maxValue, unit }) => {
	const [chartWidth, setChartWidth] = useState(null);
  
	useEffect(() => {
	  //Create observer which detects chart rezise - effect runs only when component is mounted
	  const observer = new ResizeObserver(resizeChartHandler);
	  observer.observe(document.querySelector(`.${classes.linechart}`));
  
	  return () => {
		observer.disconnect();
	  };
	}, []);
  
	// handler that is triggered when resize of chart is observed (this changes the state and the component updates)
	const resizeChartHandler = () => {
	  const width = document
		.querySelector(`.${classes.linechart}`)
		?.getBoundingClientRect().width;
	  setChartWidth(width);
	};
  
	if (
	  data.filter(item => item).length !== data.length ||
	  data.reduce((acc, item) => (item ? acc + item.value : acc + 0), 0) === 0 ||
	  !data ||
	  data.length === 0
	) {
	  return (
		<div className={classes.linechart} style={{ opacity: 0.8 }}>
		  <Divisions maxValue={maxValue} unit={unit} />
		  <p className={classes.linechart__message}>
			You have no activity logged in the last 7 days! Get active to track
			your weekly progress!
		  </p>
		</div>
	  );
	}
  
	return (
	  <div className={classes.linechart}>
		<Divisions maxValue={maxValue} unit={unit} />
		{data.map((item, index) => {
		  const leftOffset = (chartWidth / data.length) * (index + 1);
		  const base = chartWidth / data.length;
		  const hasLine = index + 1 !== data.length;
		  return (
			<DataPoint
			  label={item.label}
			  key={index}
			  bottom={item.value}
			  left={leftOffset}
			  base={base}
			  index={index}
			  hasLine={hasLine}
			  nextPointValue={hasLine ? data[index + 1].value : 0}
			/>
		  );
		})}
	  </div>
	);
  };
  
  export default React.memo(LineChart);
  