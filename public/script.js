// Creating a Vue instance
// A Vue instance is initialized by passing a "Vue constructor object", {}, inside it
// 'el' is a key that specifies where in the DOM that we want to attach the Vue instance >> this is by mapping to index.html DOM >> accepts string data type
// 'data' accepts object data type >> this is crucial as 'data' contains key(s) that will be passed to Vue and called like so {{ key_name }} in the HTML
// configuring 'data' would allow data to be rendered in the DOM
new Vue({
  el: "#app",
  data: {
    total: 0,
    items: [
      { title: "Title 1" },
      { title: "Title 2" },
      { title: "Title 3" },
      { title: "Title 4" }
    ],
    cart: []
  },
  methods: {
    // Context: this is being triggered onClick 
    addItem: function(index) {
      // Action 1: Accumulate the total value of item added to cart
      this.total += 11;
      // Action 2: Add the chosen "item object" into the cart
      // cart will have an array of items object
      this.cart.push(this.items[index]);
    }
  }
});
