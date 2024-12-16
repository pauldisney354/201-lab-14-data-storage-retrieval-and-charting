'use strict';

function AppState() {
  this.allProducts = [];
}

AppState.prototype.instantiateProducts = function () {
  const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] === 'sweep') {
      this.allProducts.push(new Product(productNames[i], 'png'));
    } else {
      this.allProducts.push(new Product(productNames[i]));
    }
  }
};

AppState.prototype.saveToLocalStorage = function () {
  const productsData = JSON.stringify(this.allProducts);
  localStorage.setItem('products', productsData);
};

AppState.prototype.loadItems = function () {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    const parsedProducts = JSON.parse(storedProducts);
    this.allProducts = parsedProducts.map(productData => {
      const product = new Product(productData.name, productData.source.split('.')[1]);
      product.timesClicked = productData.timesClicked;
      product.timesShown = productData.timesShown;
      return product;
    });
  } else {
    this.instantiateProducts();
  }
};

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.source = `assets/${name}.${fileExtension}`;
  this.timesClicked = 0;
  this.timesShown = 0;
}
