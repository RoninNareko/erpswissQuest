import Cart from "./cart.js";
import { createProductCard } from "./productCard.js";

const globalData = {
  selectedCategory: null,
  sortedBy: null,
};

function fetchProducts() {
  const apiUrl = "https://fakestoreapi.com/products";
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);

      products.forEach((product) => {
        const productItemHTML = createProductCard(product);

        productContainer.innerHTML += productItemHTML;
      });
      Cart();
    } else {
      console.error("Ошибка при запросе продуктов: " + xhr.status);
    }
  };

  xhr.send();
}

function fetchProductsByCategoryAndSort(category, sortBy) {
  let apiUrl = `https://fakestoreapi.com/products`;

  if (category && category !== "all") {
    apiUrl += `/category/${category}`;
  }

  if (sortBy) {
    apiUrl += `?sort=${sortBy}`;
  }
  console.log(apiUrl, category, sortBy);
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);

      products.forEach((product) => {
        const productItemHTML = createProductCard(product);

        productContainer.innerHTML += productItemHTML;
      });
      Cart();
    } else {
      console.error("Ошибка при запросе продуктов: " + xhr.status);
    }
  };

  xhr.send();
}

document
  .querySelector(".categories-section ul")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
      const selectedCategory = e.target.getAttribute("data-category");
      if (selectedCategory) {
        globalData.selectedCategory = selectedCategory;
        const sortBy = globalData.sortedBy;
        fetchProductsByCategoryAndSort(selectedCategory, sortBy);
      }
    }
  });

document
  .querySelector(".dropdown-menu")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
      const selectedSort = e.target.getAttribute("data-sort");
      globalData.sortedBy = selectedSort;
      const selectedCategory = globalData.selectedCategory;
      fetchProductsByCategoryAndSort(selectedCategory, selectedSort);
    }
  });

fetchProducts();
