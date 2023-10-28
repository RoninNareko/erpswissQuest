import Cart from "./cart.js";

const globalData = {
  selectedCategory: null, // Выбранная категория
  sortedBy: null, // Выбранный фильтр
};

function fetchProducts() {
  const apiUrl = "https://fakestoreapi.com/products";
  const productContainer = document.querySelector(".product-container");

  // Очистка контейнера перед обновлением
  productContainer.innerHTML = "";

  // Создаем XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);

      // Добавляем каждый продукт как карточку на страницу
      products.forEach((product) => {
        const productItemHTML = `
                    <div class="card product" style="width: 18rem;">
                        <img class="card-img-top" src="${product.image}" alt="${product.title}">
                        <div class="card-body">
                            <div>
                                <div>
                                    <h6>
                                        <a>${product.title}</a>
                                    </h6>
                                </div>
                                <div>
                                    <div></div>
                                    <div>
                                        <span>US$&nbsp;<span>${product.price}</span></span>
                                        <button type="button" class="btn add-to-cart btn-primary btn-sm">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

        productContainer.innerHTML += productItemHTML;
      });
      Cart();
    } else {
      console.error("Ошибка при запросе продуктов: " + xhr.status);
    }
  };

  xhr.send();
}

// Функция для получения продуктов по категории
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

  // Очистка контейнера перед обновлением
  productContainer.innerHTML = "";

  // Создаем XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);

      // Добавляем каждый продукт как карточку на страницу
      products.forEach((product) => {
        const productItemHTML = `
                    <div class="card product" style="width: 18rem;">
                        <img class="card-img-top" src="${product.image}" alt="${product.title}">
                        <div class="card-body">
                            <div>
                                <div>
                                    <h6>
                                        <a>${product.title}</a>
                                    </h6>
                                </div>
                                <div>
                                    <div></div>
                                    <div>
                                        <span>US$&nbsp;<span>${product.price}</span></span>
                                        <button type="button" class="btn add-to-cart btn-primary btn-sm">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

        productContainer.innerHTML += productItemHTML;
      });
    } else {
      console.error("Ошибка при запросе продуктов: " + xhr.status);
    }
  };

  xhr.send();
}

// Обработчик клика по категории и сортировке
document
  .querySelector(".categories-section ul")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
      const selectedCategory = e.target.getAttribute("data-category");
      if (selectedCategory) {
        globalData.selectedCategory = selectedCategory; // Обновляем выбранную категорию
        const sortBy = globalData.sortedBy; // Получаем выбранный способ сортировки
        fetchProductsByCategoryAndSort(selectedCategory, sortBy); // Выполняем запрос для новой категории с сортировкой
      }
    }
  });

// Обработчик для выбора сортировки
document
  .querySelector(".dropdown-menu")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
      const selectedSort = e.target.getAttribute("data-sort");
      globalData.sortedBy = selectedSort;
      const selectedCategory = globalData.selectedCategory;
      fetchProductsByCategoryAndSort(selectedCategory, selectedSort); // Выполняем сортировку для текущей категории
    }
  });
// Вызов функции для получения и отображения продуктов
fetchProducts();
