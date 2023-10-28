import { api } from "./apiConfig.js";
import handleCartInteractions from "./cart.js";
import { createProductCard } from "./productCard.js";

import {
  sortProductsByTitleAsc,
  sortProductsByTitleDesc,
} from "./sortProducts.js";

export function fetchProductsByCategoryAndSort(category, sortBy) {
  let apiURL = api.getAllProductsUrl;

  if (category && category !== "all") {
    apiURL += `/category/${category}`;
  }

  if (sortBy !== "title-desc" && sortBy !== "title-asc") {
    apiURL += `?sort=${sortBy}`;
  }

  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiURL, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let products = JSON.parse(xhr.responseText);

      if (sortBy === "title-asc") {
        products = sortProductsByTitleAsc(products);
      } else if (sortBy === "title-desc") {
        products = sortProductsByTitleDesc(products);
      }
      products.forEach((product) => {
        const productItemHTML = createProductCard(product);

        productContainer.innerHTML += productItemHTML;
      });
      handleCartInteractions();
    } else {
      console.error("Ошибка при запросе продуктов: " + xhr.status);
    }
  };

  xhr.send();
}

export function loadInitialProducts() {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", api.getAllProductsUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);

      products.forEach((product) => {
        const productItemHTML = createProductCard(product);

        productContainer.innerHTML += productItemHTML;
      });
      handleCartInteractions();
    } else {
      console.error("Ошибка при запросе продуктов: " + xhr.status);
    }
  };

  xhr.send();
}
