import { createSlice } from '@reduxjs/toolkit';
import { getData, persistData } from '../helpers/helpers';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    date: new Date().toDateString(),
    hours: [
      { hour: 5, activeMinutes: 0 },
      { hour: 6, activeMinutes: 0 },
      { hour: 7, activeMinutes: 0 },
      { hour: 8, activeMinutes: 0 },
      { hour: 9, activeMinutes: 0 },
      { hour: 10, activeMinutes: 0 },
      { hour: 11, activeMinutes: 0 },
      { hour: 12, activeMinutes: 0 },
      { hour: 13, activeMinutes: 0 },
      { hour: 14, activeMinutes: 0 },
      { hour: 15, activeMinutes: 0 },
      { hour: 16, activeMinutes: 0 },
      { hour: 17, activeMinutes: 0 },
      { hour: 18, activeMinutes: 0 },
      { hour: 19, activeMinutes: 0 },
      { hour: 20, activeMinutes: 0 },
      { hour: 21, activeMinutes: 0 },
      { hour: 22, activeMinutes: 0 },
      { hour: 23, activeMinutes: 0 },
    ],
    numberOfCompletedPomodoros: 0,
    numberOfCompletedTasks: 0,
    activeMinutesAlreadyAdded: 0,
  },
  reducers: {
    getActivityData(state) {
      const storedData = getData('activity');
      state.hours = storedData.hours;
      state.numberOfCompletedPomodoros = storedData.numberOfCompletedPomodoros;
      state.numberOfCompletedTasks = storedData.numberOfCompletedTasks;
      state.activeMinutesAlreadyAdded = storedData.activeMinutesAlreadyAdded;
    },

    addActiveTime(state, action) {
      let { startingHour, hoursOfActivity, remainingMinutes, safeToSave } =
        action.payload;
      const indexStarting = state.hours.findIndex(
        hour => hour.hour === startingHour
      );

      let index = indexStarting;

      // If we computed hours we complete them in state
      // and increment the index to update minutes correctly when loop ends
      while (hoursOfActivity) {
        if (!state.hours[index].activeMinutes || safeToSave)
          state.hours[index].activeMinutes = 60;
        else
          throw new Error(
            'You have already logged time for an hour in your interval. Do you want to override it?'
          );
        hoursOfActivity--;
        index++;
      }

      // loop entered => not updating the starting hour, but the one that the loop ended with
      // loop not entered => we update the starting hour
      if (!state.hours[index].activeMinutes || safeToSave) {
        if (index === indexStarting || remainingMinutes > 0)
          state.hours[index].activeMinutes = remainingMinutes;
      } else
        throw new Error(
          'You have already logged time for an hour in your interval. Do you want to override it?'
        );
      persistData('activity', state);
    },

    saveMinutesWhenPomodoroPaused(state, action) {
      const { totalSeconds, countdown, reinitMinutesPassed } = action.payload;
      const currentHour = new Date().getHours();
      const currentMinutes = new Date().getMinutes();

      if (currentHour > 4 && currentHour < 24) {
        const indexOfHour = state.hours.findIndex(
          hour => hour.hour === currentHour
        );
        const passedMinutes =
          Math.trunc(
            (totalSeconds - (countdown.minutes * 60 + countdown.seconds)) / 60
          ) - state.activeMinutesAlreadyAdded;

        //console.log(currentMinutes, passedMinutes);
        if (passedMinutes > currentMinutes) {
          //Update current hour
          const minutesToAddToCurrentHour = currentMinutes;
          state.hours[indexOfHour].activeMinutes += minutesToAddToCurrentHour;

          //Update passed hour (or hours if minutes are more than 60)
          let minutesToAddToPassedHour = passedMinutes - currentMinutes;
          let indexOfHourToAddTo = indexOfHour - 1;
          while (minutesToAddToPassedHour > 60) {
            state.hours[indexOfHourToAddTo].activeMinutes += 60;
            minutesToAddToPassedHour -= 60;
            indexOfHourToAddTo--;
          }
          state.hours[indexOfHourToAddTo].activeMinutes +=
            minutesToAddToPassedHour;
        } else {
          const newActiveMinutes =
            state.hours[indexOfHour].activeMinutes + passedMinutes;
          state.hours[indexOfHour].activeMinutes = newActiveMinutes;
        }
        if (!reinitMinutesPassed)
          state.activeMinutesAlreadyAdded += passedMinutes;
        else state.activeMinutesAlreadyAdded = 0;
      }
      persistData('activity', state);
    },

    addCompletedPomodoro(state) {
      state.numberOfCompletedPomodoros++;
      persistData('activity', state);
    },

    updateNumberOfCompletedTasks(state, action) {
      const operation = action.payload;
      if (operation === 'add') state.numberOfCompletedTasks++;
      if (operation === 'subtract') state.numberOfCompletedTasks--;
      persistData('activity', state);
    },
  },
});

export const activityActions = activitySlice.actions;
export default activitySlice.reducer;
