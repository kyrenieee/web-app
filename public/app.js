document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
  
      // Form submission event handler
      productForm.addEventListener('submit', function(event) {
          event.preventDefault(); 
      
          const Name = document.getElementById('productName').value;
          const Price = document.getElementById('productPrice').value;
      
          // Send POST request to add a new item
          fetch('http://localhost:3000/product', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Name, Price }) 
          })
          .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
          })
          .then(product => {
          // Clear the form
          productForm.reset();
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
                <td>${item.productName}</td>
                <td>${item.ProductPrice}</td>`
            });
        })
        .catch(error => console.error('Error fetching:', error));
    }
    fetchItem();
  });