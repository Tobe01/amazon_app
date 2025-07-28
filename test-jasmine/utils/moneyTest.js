import {formatCurrency} from '../../scripts/utils/money.js';


describe('Test suit: Format currency', ()=> {
  it('converts cents to dollars', ()=> {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with zero', ()=> {
    expect(formatCurrency(0)).toEqual('0.00');
  });
});