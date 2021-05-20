class Stock extends Product {
    constructor(sku, name, price, desc, quantity) {
        super(sku, name, price, desc);
        this.quantity = quantity;
    }
}