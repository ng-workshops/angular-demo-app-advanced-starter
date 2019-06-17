const products = require('./products');

module.exports = {
  /**
   * @param {string} search
   */
  getAll: search => {
    if (search) {
      return (
        products.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase())
        ) || []
      );
    }

    return products;
  },
  getById: id => products.find(p => p.id === +id),
  create: newProduct => {
    let lastProduct = products.sort((a, b) => b.id - a.id)[0];
    newProduct.id = lastProduct.id + 1;
    products.push(newProduct);

    return newProduct;
  },
  update: product => {
    let index = products.findIndex(p => p.id === +product.id);
    products.splice(index, 1, product);

    return product;
  }
};
