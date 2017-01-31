function solve() {

    function getProduct(productType, name, price) {
        return {
            productType: productType,
            name: name,
            price: price
        };
    }


    function getShoppingCart() {
        return (function() {
            let products = [];

            function add(product) {
                products.push(product);
                return this;
            }

            function remove(product) {
                if (products.length === 0) {
                    throw "no products";
                }

                if (!products.some(p => p.price === product.price && p.name === product.name &&
                        p.productType === product.productType)) {
                    throw "no such product to remove";
                }

                for (let i = 0; i < products.length; i += 1) {

                    if (products[i].price === product.price && products[i].name === product.name &&
                        products[i].productType === product.productType) {
                        products.splice(i, 1);
                        return this;
                    }
                }

                return this;
            }

            function showCost() {
                if (products.length === 0) {
                    return 0;
                }

                return products.reduce((a, b) => a + b.price, 0);
            }

            function showProductTypes() {
                let types = [];
                for (let pr of products) {
                    if (!types.some(t => t === pr.productType)) {
                        types.push(pr.productType);
                    }
                }

                return types.sort(function(a, b) {
                    if (a > b) {
                        return 1;
                    } else if (a < b) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }

            function getInfo() {
                let result = {},
                    uniqueNames = [];

                // getting all unique names from all products
                for (let p of products) {
                    if (!uniqueNames.some(n => p.name === n)) {
                        uniqueNames.push(p.name);
                    }
                }

                // console.log(uniqueNames);

                let resultProducts = [];
                // pushing information about unique producst in the result object
                for (let name of uniqueNames) {

                    let filteredNames = products.filter(p => p.name === name);
                    let priceName = filteredNames.reduce((a, b) => a + b.price, 0);

                    resultProducts.push({ name: name, quantity: filteredNames.length, totalPrice: priceName });

                }

                result.products = resultProducts;
                result.totalPrice = showCost();

                return result;
            }


            return {
                products: products,
                add: add,
                remove: remove,
                showCost: showCost,
                showProductTypes: showProductTypes,
                getInfo: getInfo
            };
        })();

    }

    return {
        getProduct: getProduct,
        getShoppingCart: getShoppingCart
    };
}

module.exports = solve();