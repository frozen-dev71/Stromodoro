export const persistData = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getData = key => {
	return JSON.parse(localStorage.getItem(key));
  };
  
  export const getVariableFromRoot = varName => {
	return getComputedStyle(document.documentElement).getPropertyValue(varName);
  };
  
  export const dateIsToday = dateToBeChecked => {
	if (!dateToBeChecked) return;
	const today = new Date();
	const date = new Date(dateToBeChecked);
	if (
	  date.getDate() === today.getDate() &&
	  date.getMonth() === today.getMonth() &&
	  date.getFullYear() === today.getFullYear()
	)
	  return true;
	return false;
  };
  export const dateIsYesterday = dateToBeChecked => {
	if (!dateToBeChecked) return;
	const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
	const date = new Date(dateToBeChecked);
	if (
	  date.getDate() === yesterday.getDate() &&
	  date.getMonth() === yesterday.getMonth() &&
	  date.getFullYear() === yesterday.getFullYear()
	)
	  return true;
	return false;
  };
  
  /////////////////////////////////////////////////////////////////////////////
  // HELPERS FOR CALENDAR OPERATIONS (more specific than the others, but kept here in order to have lean components and reuse them)
  /**
   *
   * @param {array} hours - has objects from calendar registrations {hour: '', activeMinutes: ''}
   * @returns - the total of activeMinutes converted in decimal hours
   */
  export const addHours = hours => {
	const totalMinutes = hours.reduce((acc, hour) => acc + hour.activeMinutes, 0);
	const decimalHours = +(totalMinutes / 60).toFixed(2);
	return decimalHours;
  };
  
  /**
   *
   * @param {array} daysToCompute - the stored data for last 7 days
   * @param {date} lastDayInArray - needed to compute each weekday
   * @param {string} typeOfValues id to choose what data will be mapped ('hours' | 'tasks')
   * @returns {array} that has the structure needed for the line chart [{label: '', value:''}]
   */
  export const mapProgressData = (
	daysToCompute,
	lastDayInArray,
	typeOfValues = 'hours'
  ) => {
	const data = daysToCompute.map((day, index) => {
	  const weekday = new Date(
		lastDayInArray.getTime() -
		  1000 * 3600 * 24 * (daysToCompute.length - index - 1)
	  )
		.toDateString()
		.slice(0, 3);
	  if (!day) return { label: weekday, value: 0 };
	  return {
		label: weekday,
		value:
		  typeOfValues === 'hours'
			? addHours(day.hours)
			: day.numberOfCompletedTasks,
	  };
	});
	return data;
  };
  
  /**
   * function finds last 7 days in calendar, their weekday labels and their active time
   * @param {array} calendar stored data from redux store/local storage
   * @param {string} typeOfValues id to choose what data will be mapped ('hours' | 'tasks')
   * @returns array with the last 7 weekdays active time
   */
  export const findWeeklyData = (calendar, typeOfValues = 'hours') => {
	const lastDayInArray = new Date(Date.now() - 24 * 60 * 60 * 1000);
	//const lastDayInArray = new Date('2022-09-03T14:55:07.121Z'); // test lastDayInArray
	// console.log(lastDayInArray);
	const dateOfMonth = lastDayInArray.getDate();
	/* We will use the calendar date of lastDayInArray to determine if we have all the data needed in the lastDayInArray month's array
	or if we need to take data from the previous month's array too */
  
	if (dateOfMonth <= 7) {
	  console.log(dateOfMonth);
	  // 1) Find days from current month (will be placed right-side in the final array, hence the name)
	  const daysToComputeFromRight = calendar[lastDayInArray.getMonth()].slice(
		0,
		dateOfMonth
	  );
	  const rightData = mapProgressData(
		daysToComputeFromRight,
		lastDayInArray,
		typeOfValues
	  );
  
	  // 2) We will repeat the process as if 'lastDayOfPassedMonth' would be 'lastDayInArray' to find the missing days from our 7-days array
	  const lastDayOfPassedMonth = new Date(
		lastDayInArray.getTime() - dateOfMonth * 24 * 60 * 60 * 1000
	  );
	  // 3) Find days from passed month (will be placed left-side in the final array, hence the name)
	  const daysToComputeFromLeft = calendar[
		lastDayOfPassedMonth.getMonth()
	  ].slice(
		calendar[lastDayOfPassedMonth.getMonth()].length - 7 + rightData.length
	  );
	  // 4) If needed, we cover the case of no registrations
	  //(we get an empty array from the last operation and we map it into an array with needed length and null values)
	  if (daysToComputeFromLeft.length === 0) {
		let newLength = 7 - rightData.length;
		while (newLength) {
		  daysToComputeFromLeft.push(null);
		  newLength--;
		}
	  }
	  const leftData = mapProgressData(
		daysToComputeFromLeft,
		lastDayOfPassedMonth,
		typeOfValues
	  );
	  // 5) Concat the two arrays
	  const data = [...leftData, ...rightData];
	  return data;
	}
	if (dateOfMonth > 7) {
	  //1) Find data from last 7 days in current month's calendar
	  const daysToCompute = calendar[lastDayInArray.getMonth()].slice(
		dateOfMonth - 7,
		dateOfMonth
	  );
	  //2) Map data for desired format
	  const data = mapProgressData(daysToCompute, lastDayInArray, typeOfValues);
  
	  return data;
	}
  };
  