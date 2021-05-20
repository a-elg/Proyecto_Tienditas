class Client extends User{
    #cart;
    constructor(id, name, pswd, type, addr, cart) {
        super(id, name, pswd, type, addr);
        this.#cart = cart;
    }
    get cart(){ return this.#cart }
    set cart(c) { this.#cart = c; }
}