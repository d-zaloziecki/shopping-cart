const productApp = function () {
    return {
        products : [],

        addProduct: function(name, image, price) {
            let product = {
                name: name,
                image: image,
                price: price
            }
            this.products.push(product);
        },

        renderProducts: function() {
                $('.container2').empty();
                const source = $('#new-product-template').html();
                const template =  Handlebars.compile(source);
                const newHTML = template({addedProducts: this.products});
                $('.container2').append(newHTML);
        }
    }
}

const app2 = productApp();

app2.renderProducts();

$('.add-product').on('click', function(){
   let name =  $(this).closest('form').find('#product-name').val();
   let image = $(this).closest('form').find('#product-image').val();
   let price = $(this).closest('form').find('#product-price').val();
   app2.addProduct(name,image,price);
   app2.renderProducts();
   $('form').find('input').val("");
});