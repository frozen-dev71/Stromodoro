import { useSelector } from "react-redux";
import icons from "../../assets/icons.svg";
import Card from "../UI/Card";
import classes from "./Streaks.module.scss";
import { numDaysInMonths } from "../../helpers/config";
import { useState } from "react";

const formatSquares = (length, type) => {
  if (length === -1) length = 6;
  const squares = [];
  while (length) {
    if (type === "omitted")
      squares.push(
        <div
          className={`${classes["streak"]} ${classes["streak--omitted"]}`}
          key={`omitted__${length}`}
        ></div>
      );
    if (type === "future") squares.push(undefined);

    length--;
  }
  return squares;
};
// console.log(formatSquares(-1, "omitted"));

const Streaks = () => {
  const calendar = useSelector((state) => state.calendar.calendar);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [streaksMonth, setStreaksMonth] = useState(currentMonth);
  const [streaksYear, setStreaksYear] = useState(currentYear);

  const monthString = new Date(streaksYear, streaksMonth, 1).toLocaleString(
    "en-US",
    {
      month: "long",
    }
  );

  const firstWeekdayOfMonth =
    new Date(streaksYear, streaksMonth, 1).getDay() - 1;
  // console.log(firstWeekdayOfMonth);

  const emptySquares = formatSquares(firstWeekdayOfMonth, "omitted");

  const numDaysInStreaksMonth = numDaysInMonths[streaksMonth];

  const streaksMonthData = calendar[streaksMonth];
  const numOfFutureDays = numDaysInStreaksMonth - streaksMonthData.length;
  const futureSquares = formatSquares(numOfFutureDays, "future");
  const monthArray = [...streaksMonthData, ...futureSquares];

  // HANDLERS FOR CHANGING STREAKS MONTH AND YEAR
  const showPastMonthHandler = () => {
    const newMonth = streaksMonth - 1;
    if (newMonth >= 0) setStreaksMonth(newMonth);
    else if (newMonth < 0) {
      setStreaksMonth(11);
      setStreaksYear((prev) => prev - 1);
    }
  };
  const showNextMonthHandler = () => {
    const newMonth = streaksMonth + 1;
    // console.log(currentMonth, streaksMonth);

    if (newMonth > currentMonth && streaksYear === currentYear) return;
    if (newMonth <= 11) setStreaksMonth(newMonth);
    if (newMonth > 11) {
      setStreaksMonth(0);
      setStreaksYear((prev) => prev + 1);
    }
  };

  // CONDITIONS FOR BUTTONS
  // Show just 12 months behind
  const showBackButton =
    (streaksMonth <= currentMonth &&
      streaksYear === currentYear &&
      currentMonth !== 11) ||
    (streaksMonth > currentMonth + 1 && streaksYear === currentYear - 1) ||
    (currentMonth === 11 && streaksMonth > 0);

  // Show till current month
  const showNextButton =
    streaksMonth < currentMonth || streaksYear < currentYear;

  return (
    <Card className={classes.streaks}>
      <h3>Streaks</h3>
      <h4>{`${monthString} ${streaksYear}`}</h4>
      <div className={classes.streaks__chart}>
        <div className={classes.streaks__grid}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className={classes.day}>
              {day}
            </div>
          ))}
          {emptySquares}
          {monthArray.map((day, index) => (
            <div
              key={index}
              className={`${classes["streak"]} ${
                day ? classes["streak--checked"] : ""
              }`}
            ></div>
          ))}
          {showBackButton && (
            <button
              className={`${classes.arrow} ${classes["arrow--left"]}`}
              onClick={showPastMonthHandler}
            >
              <svg>
                <use href={`${icons}#icon-arrow-left`}></use>
              </svg>
            </button>
          )}
          {showNextButton && (
            <button
              className={`${classes.arrow} ${classes["arrow--right"]}`}
              onClick={showNextMonthHandler}
            >
              <svg>
                <use href={`${icons}#icon-arrow-right`}></use>
              </svg>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Streaks;
