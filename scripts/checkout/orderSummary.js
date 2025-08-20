import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

hello();

export function renderOrderSummary(){
  let orderSummaryHTML = '';

  cart.forEach((cartItem) => {
  
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    // Check if matchingProduct was found before trying to use it
    if (matchingProduct === undefined) {
      console.warn(`Product not found for productId: ${productId}`);
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
        const correctDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = correctDate.format('dddd, MMMM D');

    orderSummaryHTML += `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getProductPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input">
                    <span class="save-quantity-link link-primary">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryHTML(matchingProduct,cartItem)}
                </div>
              </div>
            </div>
    `
  });

  function deliveryHTML(matchingProduct, cartItem){

    let html = '';
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const correctDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = correctDate.format('dddd, MMMM D');
        const currencyString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html += `
                <div class="delivery-option js-deliveryOption"
                 data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                  <input type="radio" 
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                    ${dateString};
                    </div>
                    <div class="delivery-option-price">
                    ${currencyString} Shipping
                    </div>
                  </div>
                </div>
              `
    });

    return html;
  }


  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;


  document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      updateCartQuantity('yes');
      container.remove();

      renderPaymentSummary();
    });
  });

    

    function updateCartQuantity(exit){
      let showItem = document.querySelector('.js-display-checkout');

      let cartQuantity = 0;

      if(exit === 'yes'){
        cart.forEach((cartItem) => {
        cartQuantity -= '1';
        })  
        showItem.innerHTML = `${cartQuantity} Items`;
      } else {
        cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
        })

        showItem.innerHTML = `${cartQuantity} Items`;
      };
    }

    updateCartQuantity();


  document.querySelectorAll('.js-update-link')
  .forEach((update) => {
    const identity = update.dataset.productId;
    update.addEventListener('click', () => {
      //  console.log(identity);
      document.querySelector('.cart-item-container').classList.add('is-editing-quantity')
      document.querySelector('.js-quantity-label').innerHTML = '';
      update.innerHTML = '';
      const saveLink = document.querySelector('.save-quantity-link');
      const display = window.getComputedStyle(saveLink).display;
      if(display === 'none'){
        saveLink.style.display = 'flex';
      } else {
        saveLink.style.display = 'none';
      };
    })
  });

  document.querySelectorAll('.js-deliveryOption')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    })
  });
};



