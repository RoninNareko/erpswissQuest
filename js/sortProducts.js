export function sortProductsByTitleAsc(products) {
  return products.sort((a, b) => a.title.localeCompare(b.title));
}

export function sortProductsByTitleDesc(products) {
  return products.sort((a, b) => b.title.localeCompare(a.title));
}
