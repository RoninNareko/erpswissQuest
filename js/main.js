import { globalData } from "./globals.js"; // Импортируйте объект globalData
import {
  loadInitialProducts,
  fetchProductsByCategoryAndSort,
} from "./fetchProducts.js";

loadInitialProducts();

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
