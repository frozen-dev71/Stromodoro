import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timer';
import tasksReducer from './tasks';
import activityReducer from './activity';
import calendarReducer from './calendar';

const store = configureStore({
  reducer: {
    timer: timerReducer,
    tasks: tasksReducer,
    activity: activityReducer,
    calendar: calendarReducer,
  },
});
export default store;
