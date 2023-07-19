const addtoCart = document.querySelectorAll("#addtoCart");
let prouductCart = document.querySelector("#prouductCart");

// localStorage.setItem("product","");

if (localStorage.length == 0) {
  localStorage.setItem("product", "");
}

let dataPro;
if (localStorage.product != "") {
  dataPro = JSON.parse(localStorage.product);
} else dataPro = [];

addtoCart.forEach(function (item) {
  item.addEventListener("click", function () {
    let dad = this.parentElement.parentElement;
    let imgsrc = dad.querySelector("div img").src;
    let word = dad.querySelector("h4").innerHTML;
    let price = dad.querySelector("div p").innerHTML;
    let newpro = {
      imgsrc,
      word,
      price,
    };

    localStorage.setItem("product", JSON.stringify(dataPro));

    if (dataPro.find((el) => el.imgsrc === newpro.imgsrc)) {
      console.log("Product already exists in local storage");
      return;
    } else {
      showdate();
      dataPro.push(newpro);
      localStorage.setItem("product", JSON.stringify(dataPro));
      bola();
    }
  });
});

function showdate() {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += ` <div class="cartcotint">
                                    <div style="display:flex; align-items:center; justify-content: center;"> <img width="80px" src="${dataPro[i].imgsrc}" alt="productCart"></div>
                                        <p class="wordd" style="color:#757575;text-align: center;">${dataPro[i].word}</p>
                                        <p id="cart-price" style="color:#757575;text-align: center;">${dataPro[i].price}</p>
                                    <div style="display:flex; align-items:center; justify-content: center;"> <input value="1" id="totalcart" class="numinp" type="number"></div>
                                    <p class="total-price" style="color:#757575;text-align: center;">225</p>
                                    <div style="display:flex; align-items:center; justify-content: center; font-size: 24px; color: var(--red);"><i onclick="deleteData(${i})" style="cursor: pointer;" class='bx bxs-trash'></i></div>
                                </div>  
        `;
  }
  dataPro;
  bola();
  return (prouductCart.innerHTML = table);
}
showdate();

//remove

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);

  showdate();
  getcarttotal();
  getalltotal();
  bola();
}

//total

function getcarttotal() {
  let dadcard = document.querySelector("#prouductCart");
  let soncart = dadcard.querySelectorAll(".cartcotint");
  soncart.forEach((son) => {
    let input = son.querySelectorAll("#totalcart");
    let price = son.querySelectorAll("#cart-price");
    let total = son.querySelectorAll(".total-price");
    total[0].innerHTML = `$${price[0].innerHTML}`;

    input.forEach((inputaya) => {
      inputaya.addEventListener("change", getTotal);
      inputaya.addEventListener("keyup", getTotal);
    });

    function getTotal() {
      let pricevalue = price[0].innerHTML;
      let inputvalue = this.value;
      let totalvalue = total[0].innerHTML;
      total[0].innerHTML = `$${pricevalue * inputvalue}`;

      if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
      }
      this.value = Math.floor(this.value);
      if (pricevalue * inputvalue <= 0) {
        total[0].innerHTML = `$${price[0].innerHTML}`;
      }

      getalltotal();
    }
  });
}
getcarttotal();

function getalltotal() {
  let input = document.querySelectorAll("#totalcart");
  // input.forEach((inputaya) => {
  //   inputaya.addEventListener("change", ten);
  //   inputaya.addEventListener("keyup", ten);
  // });

  let total = document.querySelectorAll(".total-price");
  let arr = [];
  total.forEach((te) => {
    let insany = +te.innerHTML.substring(1);
    arr.push(insany);
  });

  if (arr != "" || arr == "undefined" || arr.length > 0) {
    const totalAllTotals = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    let coupon = document.getElementById("coupon");
    let apply = document.getElementById("apply");
    let descount = document.getElementById("descount");
    tem = (totalAllTotals * descount.innerText) / 100;

    apply.onclick = function () {
      if (coupon.value == "sandra") {
        descount.innerHTML = 12;
        descount.style.color = "#000000";
        descount.style.fontWeight = "700";
      } else {
        document.getElementById("totalElent").innerHTML = `$${
          totalAllTotals - tem
        }`;
      }
      document.getElementById("totalElent").innerHTML = `$${
        totalAllTotals - tem
      }`;
      showdate();
      getcarttotal();
      getalltotal();
    };

    document.getElementById("totalElent").innerHTML = `$${
      totalAllTotals - tem
    }`;
    document.getElementById("totalElent1").innerHTML = `$${totalAllTotals}`;
    return;
  } else {
    document.getElementById("totalElent").innerHTML = "0.00";
    document.getElementById("totalElent1").innerHTML = "0.00";
  }
}
getalltotal();

function bola() {
  let ball = document.querySelector(".ball");
  if (dataPro.length == 0) {
    ball.style.display = "none";
  } else {
    ball.style.display = "flex";
  }
}

let scr = document.getElementById("scr");

setInterval(function () {
  setTimeout(function () {
    scr.style.rotate = "180deg";
    setTimeout(function () {
      scr.style.rotate = "0deg";
      setTimeout(function () {
        scr.style.rotate = "180deg";
      }, 500);
    }, 500);
  }, 500);
}, 1500);

let flipcardfront = document.querySelector(".flip-card-front");
let flipcardinner = document.querySelector(".flip-card-inner");
function flip() {
  flipcardinner.classList.add("flip");
}




// copy text


let copyText = document.querySelector(".copy-text");
copyText.querySelector("button").addEventListener("click", function () {
  let input = copyText.querySelector("input.text");
  input.select();
  document.execCommand("copy");
  copyText.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(function () {
    copyText.classList.remove("active");
  }, 2500);
});
