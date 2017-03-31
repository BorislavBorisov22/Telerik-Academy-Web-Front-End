  var year = 2017,
      month = 2;

  var firstDayOfMonth = new Date(year, month, 1);
  var firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
  /* ! */
  var lastDayOfMonth = new Date(firstDayOfMonth.setMonth(month + 1) - 1).getDate();

  console.log(lastDayOfMonth);