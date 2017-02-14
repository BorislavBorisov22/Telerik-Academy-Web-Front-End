/* globals module */

"use strict";


function solve() {
    class Product {
        constructor(productType, name, price) {
            this.price = price;
            this.productType = productType;
            this.name = name;
        }
    }

    class ShoppingCart {
        constructor() {
            this._products = [];
        }

        get products() {
            return this._products;
        }

        add(product) {
            this._products.push(product);
            return this;
        }

        remove(product) {
            let productIndex = this._products.findIndex(x => x.price === product.price &&
                x.productType === product.productType &&
                x.name === product.name);

            if (productIndex < 0) {
                throw "no such produc in the shopping cart to remove";
            }

            this._products.splice(productIndex, 1);
            return this;
        }

        showCost() {
            return this._products.reduce((a, b) => a + b.price, 0);
        }

        showProductTypes() {
            let uniqueTypes = {};

            this._products.forEach(function(x) {
                if (!uniqueTypes[x.productType]) {
                    uniqueTypes[x.productType] = true;
                }
            });

            return Object.keys(uniqueTypes).sort();
        }

        getInfo() {
            let productsAndCount = {};

            this._products.forEach(function(x) {
                if (!productsAndCount[x.name]) {
                    productsAndCount[x.name] = x;
                    productsAndCount[x.name].count = 1;
                } else {
                    productsAndCount[x.name].count += 1;
                }
            });

            const resultProducts = Object.keys(productsAndCount).map(function(x) {
                return {
                    name: x,
                    totalPrice: productsAndCount[x].count * productsAndCount[x].price,
                    quantity: productsAndCount[x],
                };
            });

            return {
                products: resultProducts,
                totalPrice: this.showCost()
            };
        }
    }

    return {
        Product,
        ShoppingCart
    };
}

module.exports = solve;