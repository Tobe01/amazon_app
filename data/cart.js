export const cart = [];

export function addToCart(productId){

    // make matchingItem undefined
    let matchingItem;  

    /* Loop through the cart to check if product name is available
    in each, and save in matching Item variable
    */
    cart.forEach((item) => {
      if(productId === item.productId)
      matchingItem = item;
    })
    
    /* if product name is available. add it to matching item, and increase the quantity by 1
     else, push a new items into the cart
    */
    if(matchingItem){
      matchingItem.quantity += 1;
    } else{
        cart.push({
        productId: productId,
        quantity: 1
      })
    }
}
