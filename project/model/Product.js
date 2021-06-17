class Product {
    constructor(sku, name, price, desc,img_path) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.img_path=img_path;
    }
}

class Stock extends Product {
    constructor(sku, name, price, desc, quantity) {
        super(sku, name, price, desc);
        this.quantity = quantity;
    }
}