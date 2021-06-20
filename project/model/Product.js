class Product {
    constructor(sku, name,brand,category, price, desc,img_path) {
        this.sku = sku;
        this.name = name;
        this.brand=brand;
        this.price = price;
        this.desc = desc;
        this.img_path=img_path;
    }
}module.exports.Product=Product;

class Stock extends Product {
    constructor(sku, name, brand, price, desc, img_path, quantity) {
        super(sku, name, brand, price, desc, img_path);
        this.quantity = quantity;
    }
}module.exports.Stock=Stock;