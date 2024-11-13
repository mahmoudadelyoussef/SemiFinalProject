 
const myList = document.body.querySelectorAll("ul li")
const clostBtn = document.querySelector(".closeListIndex");
myList.forEach((ele) => {
    ele.onclick = () => {
        removeActive()
        ele.setAttribute("class", "active");
        clostBtn.click();
    }
})
const myIcon = document.querySelector(".desktop i");
myIcon.onclick = () => {
    document.querySelector("ul").classList.toggle("visibiltyCls");
    document.querySelector(".closeList").classList.remove('closeList');
    document.querySelector("body").style.overflow = "hidden"
}
clostBtn.onclick = () => {
    myIcon.click();
    document.querySelector(".closeListIndex").classList.add("closeList");
    document.querySelector("body").style.overflow = ""
}

function removeActive() {
    myList.forEach((ele) => {
        ele.removeAttribute("class");
    })
}


// function scrollCardsRight() {
//     document.querySelector(".leftArrowDiv").classList.remove("arrowDivClick")
//     document.querySelector(".RightArrowDiv").classList.add("arrowDivClick")
//     document.querySelector('.burgersCards').scrollBy({
//         left: 300,
//         behavior: 'smooth'
//     });
// }
// function scrollCardsLeft() {
//     document.querySelector(".RightArrowDiv").classList.remove("arrowDivClick")
//     document.querySelector(".leftArrowDiv").classList.add("arrowDivClick")
//     document.querySelector('.burgersCards').scrollBy({
//         left: -300,
//         behavior: 'smooth'
//     });
// }
let burgersObject=undefined;
function fetchData(){
    fetch("http://localhost:3000/items").then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
}).then(data => {
    burgersObject = data;
    burgersObject.forEach((element) => {

        let favStyle = `${element.isFavourite ? 'style="background-color: white;"':'style="display: none;"'} `;
        let isAddedToCart = `${element.isAddedToCart ? 'style="pointer-events:none;opacity:0.5" ' : ''}`

        document.querySelector(".burgersCards").innerHTML += `
                    <div class="burgerCard">

                    <div class="burgerImageContainer">
                        <div class="icons-navBar-Burger">
                            <i class="fa-solid fa-heart" 
                                ${favStyle}></i>
                        </div>
                        <img src=${element.image} alt="">
                    </div>

                    <div class="priceAndRate">
                        <label for="">${element.price}EGP</label>
                        <div class="rate">
                            <i class="fa-solid fa-star"></i>
                            <p for="">${element.rate}</p>
                        </div>

                    </div>
                    <div class="lineDiv">
                    </div>
                    <div class="sandText">
                        <p>${element.title}</p>
                    </div>

                    <div class="sandwitchDesc">
                        <div class="sandwitchDeatils">
                            <i class="fa-regular fa-circle-check"></i>
                            <p for="">${element.pieces} Pieces</p>
                        </div>
                        <div class="sandwitchDeatils">
                            <i class="fa-regular fa-circle-check"></i>
                            <p for="">${element.isSpicy  ?  'Spicy Sauce' : 'Regular Sauce'}</p>
                        </div>
                    </div>
                    <div>
                         
                        <button class="AddFavBtn"${isAddedToCart} onclick="addToCart(${element.id})">Add To Cart</button>

                    </div>
                </div>
        `
    })
}).catch(error => { console.error("Fetch error: ", error); });
}

fetchData();

function addToCart(itemId) {
    fetch(`http://localhost:3000/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isAddedToCart: 1 })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update item in cart');
      }
      return response.json();
    })
    .then(data => {
        document.querySelector(".burgersCards").innerHTML=''
        fetchData();

        const cartCount = burgersObject.filter(item => item.isAddedToCart === 1).length;

        // Update the cart counter element
        document.querySelector(".cart-counter").textContent = cartCount;


      console.log('Item added to cart:', data);
      // Optionally update UI to reflect the change
    })
    .catch(error => console.error('Error:', error));
  }
  
  
// let scrollInterval;

// function startScrolling(direction) {
//     scrollInterval = setInterval(() => {
//         if (direction === 'left') {
//             scrollCardsLeft();
//         } else if (direction === 'right') {
//             scrollCardsRight();
//         }
//     }, 100);  

// function stopScrolling() {
//     clearInterval(scrollInterval);
// }