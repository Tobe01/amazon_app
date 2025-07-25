import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let today = dayjs();

console.log(today);

let fiveDays = today.add(5, 'days');

console.log(fiveDays);

let formatDays = fiveDays.format('M, D');

console.log(formatDays);

let oneMonth = fiveDays.add(1, 'month');

console.log(oneMonth);

oneMonth = dayjs();

console.log(oneMonth);

let freshMonth = oneMonth;

console.log(freshMonth);

let subtract = freshMonth.subtract(1, 'month');

console.log(subtract);

let backDate = subtract.format('M, D');

console.log(backDate);

let newDate = subtract.format('dddd');

console.log(newDate);

function isWeekend(date){
  const dayys = date.format('dddd')
  return dayys = 'Saturday' || 'Sunday';

  console.log(dayys);
};




