import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/backend-practice.js';
// import '../data/cart-class.js';

loadCart();


Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=> {
    loadCart(()=> {
      resolve('Value 2');
    })
  })
]). then((value)=> {
   console.log(value);
   renderOrderSummary();
   renderPaymentSummary();
});