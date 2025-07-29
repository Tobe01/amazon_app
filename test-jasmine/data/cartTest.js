import {addToCart, cart} from '../../data/cart.js';

describe('Test suit: add to cart', ()=>{
  it('adds a new product to the cart', ()=> {

  })

  it('updates the cart with an exixting product', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
     console.log(localStorage.getItem('cart'));
    
      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expects(cart.length()).toEqual(1);
  });
});