class Product {
    constructor(sku, name, price, desc) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.desc = desc;
    }
}

class Stock extends Product {
    constructor(sku, name, price, desc, quantity) {
        super(sku, name, price, desc);
        this.quantity = quantity;
    }
}