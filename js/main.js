const elForm = document.querySelector(".js-form");
const elTemplate = document.querySelector(".js-template").content;
const elList = document.querySelector(".js-list");
const elSelect = document.querySelector(".js-select");
const fragment = document.createDocumentFragment();
let elSearch = document.querySelector(".js-search");

setInterval(() => {
  document.querySelector("body").style.backgroundColor = `#${Math.ceil(
    Math.random() * 9999
  )}`;
}, 3000);

const renderCountries = (array, node) => {
  node.innerHTML = "";

  array.forEach((country) => {
    const newTemplate = elTemplate.cloneNode(true);

    let newImg = newTemplate.querySelector(".js-img");
    let newTitle = newTemplate.querySelector(".item-title");
    let newPopular = newTemplate.querySelector(".item-popular");
    let newCapital = newTemplate.querySelector(".item-capital");
    let newRegion = newTemplate.querySelector(".item-region");

    newImg.src = country.flags.svg;
    newTitle.textContent = "Name: " + country.name.common;
    newPopular.textContent = "Population: " + country.population;
    newCapital.textContent = "Capital: " + country.capital;
    newRegion.textContent = "Region: " + country.region;

    fragment.appendChild(newTemplate);
  });

  node.appendChild(fragment);
};

const getCountries = async (url) => {
  const response = await fetch(`https://restcountries.com/v3.1/${url}`);
  const data = await response.json();
  // console.log(data);
  renderCountries(data, elList);
};

getCountries("all");

elSearch.addEventListener("input", (evt) => {
  evt.preventDefault();

  if (elSearch.value !== "") {
    getCountries(`name/${elSearch.value}`);
  }
});

elSelect.addEventListener("change", (evt) => {
  evt.preventDefault();
  if (elSelect.value === "All") getCountries("all");
  else if (elSelect.value) getCountries(`region/${elSelect.value}`);
});
