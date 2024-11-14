const PORT = 'http://localhost:3000'

const catCls = document.querySelector(".catCls");
const burgersCards = document.querySelector(".burgersCards");

async function getCat(myData) {

    if (sessionStorage.getItem("CatResults") == null) {
        const res = await fetch(`${PORT}/catergories`);
        let result = await res.json();

        sessionStorage.setItem("CatResults", JSON.stringify(result))
    }

    // Retrieve from sessionStorage if needed
    const catResults = JSON.parse(sessionStorage.getItem("CatResults"));

    const selectedCategory = myData !== undefined ? [catResults[myData - 1]] : catResults;
    catCls.innerHTML = '';
    burgersCards.innerHTML = '';

    let favStyle = '';// `${element.isFavourite ? 'style="background-color: white;"' : 'style="display: none;"'} `;
    let isAddedToCart = '';// `${element.isAddedToCart ? 'style="pointer-events:none;opacity:0.5" ' : ''}`

    selectedCategory.forEach(ele => {

        catCls.innerHTML +=
            `
            <div class="catContent">
                <div onclick="getCatData(${ele.id})" class="catConteImgDiv" ${ele.isActive == 1 ? 'style="outline:1px solid red" ' : ''}>
                    <img src='${ele.image}' alt="">
                   
                </div>
                <p style="color: white;">${ele.title}</p>
            </div>
            `
        if (ele.isActive == 1) {
            ele.details.forEach((ele) => {

                document.querySelector(".burgersCards").innerHTML += `
                <div class="burgerCard">
    
                <div class="burgerImageContainer">
                    <div class="icons-navBar-Burger">
                        <i class="fa-solid fa-heart" 
                            ${favStyle}></i>
                    </div>
                    <img src=${ele.image} alt="">
                </div>
    
                <div class="priceAndRate">
                    <label for="">${ele.price}EGP</label>
                    <div class="rate">
                        <i class="fa-solid fa-star"></i>
                        <p for="">${ele.rate}</p>
                    </div>
    
                </div>
                <div class="lineDiv">
                </div>
                <div class="sandText">
                    <p>${ele.title}</p>
                </div>
    
                <div class="sandwitchDesc">
                    <div class="sandwitchDeatils">
                        <i class="fa-regular fa-circle-check"></i>
                        <p for="">${ele.pieces} Pieces</p>
                    </div>
                    <div class="sandwitchDeatils">
                        <i class="fa-regular fa-circle-check"></i>
                        <p for="">${ele.isSpicy ? 'Spicy Sauce' : 'Regular Sauce'}</p>
                    </div>
                </div>
                <div>
                    
                    <button class="AddFavBtn"${isAddedToCart} onclick="addToCart(${ele.id})">Add To Cart</button>
    
                </div>
            </div>
                 `


            })
        }
    });
}

getCat()

function getCatData(id) {
    //getCat(id)
    let changedResult = JSON.parse(sessionStorage.getItem("CatResults"));
    changedResult.forEach((ele) => {
        ele.isActive = 0
    })
    changedResult[id-1].isActive = 1
    sessionStorage.setItem("CatResults", JSON.stringify(changedResult))
    getCat()
}