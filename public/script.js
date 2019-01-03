// Creating a Vue instance
// A Vue instance is initialized by passing a "Vue constructor object", {}, inside it
// 'el' is a key that specifies where in the DOM that we want to attach the Vue instance >> this is by mapping to index.html DOM >> accepts string data type
// 'data' accepts object data type >> this is crucial as 'data' contains key(s) that will be passed to Vue and called like so {{ key_name }} in the HTML
// configuring 'data' would allow data to be rendered in the DOM
const price = 11.99;

new Vue({
  el: "#app",
  data: {
    total: 0,
    items: [],
    cart: [],
    search: ''
  },
  methods: {
    // Context: this method is being triggered onClick 
    addItem(index) {
      // Action 1: Accumulate the total value of item added to cart
      this.total += price;

      // Action 2: Add the chosen "item object" into the cart. It shouldnt add another of the "same item" if it's already there. 
      // It should increment the quantity of that item in the cart
      // This is a reference variable
      const item = this.items[index];
      let found = false;
      
      for (let i = 0; i < this.cart.length; i++) {
        // Check for duplicated item based on id and flag found to 'true' if it's a non-existing item
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qtty++;
        }
        break;
      }

      // Only add item to cart if it's not already there
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qtty: 1,
          price: price
        });
      }
    },
    inc(item) {
      // Increment the quantity
      item.qtty++;
      // Increase the total price
      this.total += price;
    },
    dec(item) {
      // Decrement the quantity
      item.qtty--;
      // Decrease the total price
      this.total -= price;
      // Handle when item quantity <= 0 (since this will also affects the price)
      if (item.qtty <= 0) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            // Remove the item from the cart by 1. This is the logic to handle the UI when quantity of item reaches or less than 0
            // TODO: read on: splice()
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    },
    onSubmit() {
      // Interact with this endpoint: '/search/:query'
      // this returns a Promise: https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
      this.$http
        .get('/search/'.concat(this.search))
        .then(response => {
        // success callback
        // when queries are made, the titles and ids are obtained from imgUrl API >> and we'll be adding them to "items'"
        // this example can work because we are accessing the same JSON properties like "title", "id"
        this.items = response.data;
      }, response => {
        // error callback
      });
    }
  },
  filters: {
    currency(price) {
      return '$'.concat(price.toFixed(2));
    }
  }
});