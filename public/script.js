var ShoppingCart = function () {
  return {
    cart: [],
    shoppingList: $('.cart-list'),
    itemId: 1,


    _findItemById: function (itemId) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == itemId) {
          return this.cart[i];
        }
      }
    },

    totalPrice: function () {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price;
      }

      $('.total').empty();
      $('.total').append(total);
    },

    updateCart: function () {
      this.shoppingList.empty();

      const source = $('#shoppingList-template').html();
      const template = Handlebars.compile(source);
      const newHTML = template({ shopping: this.cart });

      this.shoppingList.append(newHTML);
      this.totalPrice();
    },


    addItem: function (chosenItem) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].name == chosenItem.name) {
          let basicPrice = this.cart[i].price/this.cart[i].dupNum;
          this.cart[i].dupNum++;
          this.cart[i].price = basicPrice * this.cart[i].dupNum;
          this.cart[i].duplicate = true;
          return;
        }
      }

      chosenItem.id = this.itemId;
      chosenItem.duplicate = false;
      chosenItem.dupNum = 1;
      this.cart.push(chosenItem)
      this.itemId++;
    },

    clearCart: function () {
      this.cart = [];
      this.updateCart();
    },

    removeItem: function (itemId) {
      let item = this._findItemById(itemId)
      if (item.dupNum > 2) {
        let basicPrice = item.price/item.dupNum;
        item.dupNum -= 1;
        item.price = basicPrice * item.dupNum;
      }
      else if (item.dupNum === 2) {
        let basicPrice = item.price/item.dupNum;
        item.dupNum -= 1;
        item.duplicate = false;
        item.price = basicPrice * item.dupNum;
      }
      else if (item.dupNum === 1) {
        this.cart.splice(this.cart.indexOf(item), 1)
      }
    }
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

$('body').on('click', '.add-to-cart', function () {
  let chosenItem = $(this).closest('.card').data()

  app.addItem(chosenItem);
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

$('.cart-list').on("mouseover", ".removeFromCart", function () {
  this.src = "cartRemove.png"
})
$('.cart-list').on("mouseout", ".removeFromCart", function () {
  this.src = "cart.png"
})

$('.cart-list').on("click", ".removeFromCart", function () {
  let itemId = $(this).closest('.shoppingCartItem').data().id;

  app.removeItem(itemId);
  app.updateCart();
})