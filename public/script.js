var ShoppingCart = function () {
  return {
    cart: [],
    shoppingList: $('.cart-list'),

    
    totalPrice: function(){
      let total = 0;
      for (let i=0; i<this.cart.length; i++){
        total += this.cart[i].price;
      }
      
      $('.total').empty() ;
      $('.total').append(total) ;
    },
    
    updateCart: function () {
      this.shoppingList.empty();

      const source = $('#shoppingList-template').html();
      const template =  Handlebars.compile(source);
      const newHTML = template({shopping: this.cart});

      this.shoppingList.append(newHTML);
      this.totalPrice();
    },


    addItem: function (chosenItem) {
      this.cart.push(chosenItem)
    },

    clearCart: function () {
      this.cart = [];
      this.updateCart();  
    },

  }
};

var app = ShoppingCart();

app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  let shoppingCart = $('.shopping-cart')
  if (shoppingCart.css("display") == 'none') {
    shoppingCart.show()
  }
  else {
    shoppingCart.hide()
  }
});

$('.add-to-cart').on('click', function () {
  const chosenItem = $(this).closest('.card').data()

  app.addItem(chosenItem);
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});