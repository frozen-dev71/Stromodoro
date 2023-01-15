import Card from "../UI/Card";
import classes from "./TasksStats.module.scss";
import BarChart from "../Charts/BarChart";
import { findWeeklyData } from "../../helpers/helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TasksStats = () => {
  const calendar = useSelector((state) => state.calendar.calendar);
  const [chartData, setChartData] = useState([]); //formatted data

  useEffect(() => {
    const data = findWeeklyData(calendar, "tasks");
    setChartData(data);
  }, [calendar]);

  let maxValue;
  if (
    chartData.length !== 0 &&
    chartData.filter((item) => item).length === chartData.length
  ) {
    maxValue = Math.max(...chartData.map((data) => data.value));
  }
  if (!chartData || chartData.length === 0) {
    maxValue = 0;
  }

  return (
    <Card className={classes.tasks}>
      <h3>Tasks Done</h3>
      <div className={classes.tasks__chart}>
        <BarChart
          maxValue={maxValue !== 0 ? 6 - (maxValue % 6) + maxValue : 6}
          unit="tasks"
          barsArray={chartData}
          opacity={maxValue ? 1 : 0.6}
          height={"18rem"}
        />
        {!maxValue && <p>You have no tasks completed in this timeframe!</p>}
      </div>
    </Card>
  );
};

export default TasksStats;
