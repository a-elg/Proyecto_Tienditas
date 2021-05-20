class DeliveryMan extends User{
    #history;
    #balance;
    constructor(id, name, pswd, type, addr, history, balance) {
        super(id, name, pswd, type, addr);
        this.#history = history;
        this.#balance = balance;
    }
    get history(){ return this.#history }
    set history(his) { this.#history = his; }
    get balance(){ return this.#balance }
    set balance(bal) { this.#balance = bal; }
    static getNearestDeliveryMan() {

    }
}