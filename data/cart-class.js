class Cart {
  cartItem;
  #localStorageKey;

  constructor(localStorageKey){
    this.#loadFromStorage(localStorageKey);

    this.#loadFromStorage();
  }

    #loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if(!this.cartItem){
        this.cartItem = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1',
        }, 
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryOptionId: '2'
        }]
      };
    }

     saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem))
    }

      addToCart(productId){
  // make matchingItem undefined
    let matchingItem;  

    /* Loop through the cart to check if product name is available
    in each, and save in matching Item variable
    */
    this.cartItem.forEach((cartItem) => {
      if(productId === cartItem.productId)
      matchingItem = cartItem;
    });
    
    /* if product name is available. add it to matching item, and increase the quantity by 1
      else, push a new items into the cart
    */
    if(matchingItem){
      matchingItem.quantity += 1;
    } else{
        this.cartItem.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
    }

      removeFromCart(productId){
      const newCart = [];

      this.cartItem.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem)
        }
      });

      this.cartItem = newCart;

      this.saveToStorage();
    }

    
  calculateCartQuantity(){
    let cartQuantity = 0;

      this.cartItem.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }

    updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;  
    this.cartItem.forEach((cartItem) => {
      if(productId === cartItem.productId)
      matchingItem = cartItem;
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }

}

const cart = new Cart('cart-oop.js');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);

