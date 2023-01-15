import classes from "./TasksPieChart.module.scss";
import { getVariableFromRoot } from "../../helpers/helpers";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

const getPercentageForCategory = (category, tasksArr) => {
  const numTasks = tasksArr.length;
  const numTasksOfCategory = tasksArr.filter(
    (task) => task.category === category
  ).length;
  return (numTasksOfCategory / numTasks) * 100;
};
const initialColors = [
  getVariableFromRoot("--color-pie-1"),
  getVariableFromRoot("--color-pie-2"),
  getVariableFromRoot("--color-pie-3"),
  getVariableFromRoot("--color-pie-4"),
  getVariableFromRoot("--color-pie-5"),
  getVariableFromRoot("--color-pie-6"),
];

const TasksPieChart = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const workPercentage = getPercentageForCategory("Work", tasks);
  const [colors, setColors] = useState(initialColors);

  const studyPercentage = getPercentageForCategory("Study", tasks);
  const exercisePercentage = getPercentageForCategory("Exercise", tasks);
  const healthPercentage = getPercentageForCategory("Health", tasks);
  const wellnessPercentage = getPercentageForCategory("Wellness", tasks);
  const choresPercentage = getPercentageForCategory("Chores", tasks);

  const workDistribution = workPercentage;
  const studyDistribution = workDistribution + studyPercentage;
  const exerciseDistribution = studyDistribution + exercisePercentage;
  const healthDistribution = exerciseDistribution + healthPercentage;
  const wellnessDistribution = healthDistribution + wellnessPercentage;
  const choresDistribution = wellnessDistribution + choresPercentage;

  const hoverLegendHandler = (event) => {
    const hoveredEl = event.target.closest("li");
    if (!hoveredEl) return;

    const index = hoveredEl.dataset.index;
    const copy = [...initialColors];
    copy[index] = getVariableFromRoot("--color-accent");
    setColors(copy);
  };
  const leaveHoverHandler = () => {
    setColors(initialColors);
  };

  if (tasks.length === 0) {
    return <p>No tasks found! Start by adding some to generate a chart</p>;
  }
  return (
    <Fragment>
      <ul
        className={classes.legend}
        onMouseOver={hoverLegendHandler}
        onMouseLeave={leaveHoverHandler}
      >
        {!!workPercentage && (
          <li data-index={0}>
            <div style={{ backgroundColor: colors[0] }}></div> Work
          </li>
        )}
        {!!studyPercentage && (
          <li data-index={1}>
            <div style={{ backgroundColor: colors[1] }}></div> Study
          </li>
        )}
        {!!exercisePercentage && (
          <li data-index={2}>
            <div style={{ backgroundColor: colors[2] }}></div> Exercise
          </li>
        )}
        {!!healthPercentage && (
          <li data-index={3}>
            <div style={{ backgroundColor: colors[3] }}></div> Health
          </li>
        )}
        {!!wellnessPercentage && (
          <li data-index={4}>
            <div style={{ backgroundColor: colors[4] }}></div> Wellness
          </li>
        )}
        {!!choresPercentage && (
          <li data-index={5}>
            <div style={{ backgroundColor: colors[5] }}></div> Chores
          </li>
        )}
      </ul>
      <div
        className={classes.pie}
        style={{
          backgroundImage: `conic-gradient(${colors[0]} 0% ${workDistribution}%, ${colors[1]} ${workDistribution}% ${studyDistribution}%, ${colors[2]} ${studyDistribution}% ${exerciseDistribution}%, ${colors[3]} ${exerciseDistribution}% ${healthDistribution}%, ${colors[4]} ${healthDistribution}% ${wellnessDistribution}%, ${colors[5]} ${wellnessDistribution}% ${choresDistribution}%)`,
        }}
      ></div>
    </Fragment>
  );
};

export default TasksPieChart;
