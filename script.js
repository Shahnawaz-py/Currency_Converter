const base_url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg span");
const swapBtn = document.querySelector("#swap");

for (let select of dropdowns) {

    for (let currCode in countryList) {

        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        }

        if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}


const updateFlag = (element) => {

    let currCode = element.value;

    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");

    img.src = newSrc;
};



btn.addEventListener("click", async (event) => {

    event.preventDefault();

    let amount = document.querySelector(".amount input");

    let amtVal = parseFloat(amount.value);

    if (isNaN(amtVal) || amtVal <= 0) {

        amtVal = 1;
        amount.value = "1";
    }


    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();


    const url = `${base_url}/${from}.json`;

    try {

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch exchange rate");
        }

        let data = await response.json();

        let rate = data[from][to];

        let finalAmount = amtVal * rate;


        msg.innerText =
            `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

    } catch (error) {

        console.error(error);

        msg.innerText = "Unable to get exchange rate. Please try again.";

    }

});


swapBtn.addEventListener("click", () => {

    let temp = fromCurr.value;

    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);

});