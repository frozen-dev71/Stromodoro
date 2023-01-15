import classes from "./ProductiveHours.module.scss";
import Card from "../UI/Card";
import BarChart from "../Charts/BarChart";
import { useSelector } from "react-redux";

const ProductiveHours = () => {
  const hours = useSelector((state) => state.activity.hours);
  const activityMinutes = hours.reduce(
    (acc, hour) => acc + hour.activeMinutes,
    0
  );

  const chartData = hours.map((hour) => ({
    label: hour.hour,
    value: hour.activeMinutes,
  }));
  return (
    <Card className={classes.hours}>
      <h3>Your Productive Hours</h3>
      <BarChart
        maxValue={60}
        unit="min"
        barsArray={chartData}
        opacity={activityMinutes ? 1 : 0.6}
      />
      {!activityMinutes && (
        <p>
          You have no activity today! Log some productive time or start your
          first pomodoro!
        </p>
      )}
    </Card>
  );
};

export default ProductiveHours;
