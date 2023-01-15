import { createSlice } from '@reduxjs/toolkit';
import { getData, persistData } from '../helpers/helpers';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    countdown: { minutes: 25, seconds: 0 },
    isActive: false,
    wasCompleted: false,
    type: 'pomodoro',
    totalSeconds: 25 * 60,
    config: {
      pomodoro: 25,
      short: 5,
      long: 10,
    },
  },
  reducers: {
    toggleIsActive(state) {
      state.isActive = !state.isActive;
      persistData('timer', state);
    },
    countdown(state, action) {
      if (state.countdown.minutes === 0 && state.countdown.seconds === 0) {
        clearInterval(action.payload);
        if (state.type === 'pomodoro') state.wasCompleted = true;
        state.countdown.minutes = 0;
        state.countdown.seconds = 0;
        state.isActive = false;
        persistData('timer', state);
        return;
      } else if (state.countdown.seconds === 0) {
        state.countdown.minutes = state.countdown.minutes - 1;
        state.countdown.seconds = 59;
      } else state.countdown.seconds = state.countdown.seconds - 1;
      persistData('timer', state);
    },
    changeTimer(state, action) {
      const timerType = action.payload;
      state.wasCompleted = false;
      state.isActive = false;
      switch (timerType) {
        case 'pomodoro':
          state.countdown = { minutes: state.config.pomodoro, seconds: 0 };
          state.type = 'pomodoro';
          state.totalSeconds = state.config.pomodoro * 60;
          break;
        case 'shortBR':
          state.countdown = { minutes: state.config.short, seconds: 0 };
          state.type = 'shortBR';
          state.totalSeconds = state.config.short * 60;
          break;
        case 'longBR':
          state.countdown = { minutes: state.config.long, seconds: 0 };
          state.type = 'longBR';
          state.totalSeconds = state.config.long * 60;
          break;
        default:
          state.countdown = { minutes: state.config.pomodoro, seconds: 0 };
          state.type = 'pomodoro';
          state.totalSeconds = state.config.pomodoro * 60;
          break;
      }
      persistData('timer', state);
    },
    updateConfig(state, action) {
      state.config = action.payload;
      persistData('timer', state);
    },
    getTimerData(state) {
      const storedData = getData('timer');
      if (storedData.wasCompleted) {
        // wasCompleted can be true just for pomodoro (since we account for completed pomodoros only)
        // => we perform a pomodoro reinitialization to avoid counting a pomodoro completion when unnecessary
        state.wasCompleted = false;
        state.isActive = false;
        state.config = storedData.config;
        state.countdown = { minutes: storedData.config.pomodoro, seconds: 0 };
        state.type = 'pomodoro';
        state.totalSeconds = storedData.config.pomodoro * 60;
        return;
      }

      // usual behavior when timer not completed
      state.isActive = storedData.isActive;
      state.countdown = storedData.countdown;
      state.type = storedData.type;
      state.totalSeconds = storedData.totalSeconds;
      state.config = storedData.config;
      state.wasCompleted = storedData.wasCompleted;
    },
    subtractOutsideSeconds(state, action) {
      const totalSeconds = action.payload;
      const minutes = Math.trunc(totalSeconds / 60);
      const seconds = totalSeconds - minutes * 60;

      const newSeconds = state.countdown.seconds - seconds;
      const newMinutes = state.countdown.minutes - minutes;

      if (newMinutes < 0) {
        state.countdown.minutes = 0;
        state.countdown.seconds = 0;
        state.isActive = false;
        if (state.type === 'pomodoro') state.wasCompleted = true;
        persistData('timer', state);
        return;
      } else state.countdown.minutes = newMinutes;
      if (newSeconds < 0 && newMinutes > 0) {
        state.countdown.seconds = 60 - Math.abs(newSeconds);
        state.countdown.minutes--;
      } else if (newSeconds < 0) {
        state.countdown.minutes = 0;
        state.countdown.seconds = 0;
        state.isActive = false;
        if (state.type === 'pomodoro') state.wasCompleted = true;
      } else state.countdown.seconds = newSeconds;
      persistData('timer', state);
    },
  },
});

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
