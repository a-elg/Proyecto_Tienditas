class Store extends User {
    #catalog;
    #suscription;
    constructor(id, name, pswd, type, addr, catalog, suscription) {
        super(id, name, pswd, type, addr);
        this.#catalog = catalog;
        this.#suscription = suscription;
    }
    get catalog(){ return this.#catalog }
    set catalog(cat) { this.#catalog = cat; }
    get suscription(){ return this.#suscription }
    set suscription(sus) { this.#suscription = sus; }
    static getCatalogs() {

    }
    static getNearestStore() {

    }
}