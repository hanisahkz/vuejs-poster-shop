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
      { 
        id: 1,
        title: "Title 1" },
      { 
        id: 2,
        title: "Title 2" },
      { 
        id: 3,
        title: "Title 3" },
      { 
        id: 4,
        title: "Title 4" }
    ],
    cart: []
  },
  methods: {
    // Context: this method is being triggered onClick 
    addItem (index) {
      // Action 1: Accumulate the total value of item added to cart
      this.total += 11;

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
      }

      // Only add item to cart if it's not already there
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qtty: 1
        });
      }
    }
  }
});