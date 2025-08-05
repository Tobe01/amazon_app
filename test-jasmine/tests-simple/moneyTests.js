import {formatCurrency} from '../../scripts/utils/money.js';

console.log('Test suit: Format currency');

console.log('converts cents to dollars');

if (formatCurrency(2095) === '20.95'){
  console.log('Passed');
} else {
  console.log('failed');
};

console.log('works with zero');

if (formatCurrency(0) === '0.00'){
  console.log('Passed');
} else {
  console.log('failed');
};