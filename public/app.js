document.addEventListener('DOMContentLoaded', () => {
  const Form = document.getElementById('productForm');
  const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];

  //Form submission event handler
  productForm.addEventListener('submit', function(event) {
      event.preventDefault(); 

  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
      console.log({ name, price });

      // Send POST request to add a new item
      fetch('http://localhost:3000/product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, price})
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(product => {
          // Clear the form
          Form.reset();
          console.log('Product added:', product);
      })
      
      .catch(error => {
          console.error('Error adding product:', error);
          alert('Failed to add product. Please try again.');
      });
  });
  // Fetch Item and update the table
  function fetchItem() {
      fetch('http://localhost:3000/product')
      .then(response => response.json())
      .then(product => {
          // Clear the table first
          itemTable.innerHTML = '';

          // Populate the table with  data
          item.forEach(product => {
          const row = itemTable.insertRow();
          row.innerHTML = 
              `<td>${item.item_ID}</td>
              <td>${item.Name}</td>
              <td>${item.Price}</td>`
          });
      })
      .catch(error => console.error('Error fetching:', error));
  }
  fetchItem();
});