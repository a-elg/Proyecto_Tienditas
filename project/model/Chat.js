class Chat {
    #purchase;
    #user;
    #message;
    constructor(purchase, user, message) {
        this.#purchase = purchase;
        this.#user = user;
        this.#message = message;
    }
    get purchase(){ return this.#purchase }
    set purchase(p) { this.#purchase = p; }
    get user(){ return this.#user }
    set user(u) { this.#user = u; }
    get message(){ return this.#message }
    set message(m) { this.#message = m; }
}