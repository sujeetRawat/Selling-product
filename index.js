function handleFormSubmit(event) {
    event.preventDefault();
    const productDetails = {
      price: event.target.price.value,
      name: event.target.name.value,
      category: event.target.category.value,
    };

    axios
      .post(
        "https://crudcrud.com/api/1d8ec289f1f744b0b76c78f3b15d981e/product",
        productDetails
      )
      .then((response) => {
        displayProductOnScreen(response.data);
        console.log(response.data);
        })
      .catch((err) => {
        document.body.innerHTML += "<h4> Something Went Wrong </h4>";
        console.log(err);
      })

      document.getElementById("price").value = "";
      document.getElementById("name").value = "";
      document.getElementById("category").value = "";
  }

  document.addEventListener('DOMContentLoaded',function() {
    axios.get("https://crudcrud.com/api/1d8ec289f1f744b0b76c78f3b15d981e/product")
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        displayUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => {
      document.body.innerHTML += "<h4> Something Went Wrong </h4>";
      console.log(err);
    })
  })

  function displayProductOnScreen(productDetails){

    const productItem = document.createElement("li");
    productItem.appendChild(
      document.createTextNode(
        `${productDetails.price} - ${productDetails.name} - ${productDetails.category}`
      )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete Order"));
    productItem.appendChild(deleteBtn);
    
    const electronicItems = document.getElementById("e_Items");
    const foodItems = document.getElementById("f_Items");
    const skinItems = document.getElementById("s_Items");

    if(productDetails.category == "Electronics") electronicItems.appendChild(productItem);
    if(productDetails.category == "Food") foodItems.appendChild(productItem);
    if(productDetails.category == "Skincare") skinItems.appendChild(productItem);

    deleteBtn.addEventListener("click", function (event) {
        productItem.remove();
        axios.delete(`https://crudcrud.com/api/1d8ec289f1f744b0b76c78f3b15d981e/product/${productDetails._id}`);
      });

  }