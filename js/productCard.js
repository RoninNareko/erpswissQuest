function createProductCard(product) {
  return `
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
}

export { createProductCard };
