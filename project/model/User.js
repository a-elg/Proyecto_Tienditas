class User {
    #id;
    #name;
    #pswd;
    #type;
    #addr;
    constructor(id, name, pswd, type, addr) {
        this.#id = id;
        this.#name = name;
        this.#pswd = pswd;
        this.#type = type;
        this.#addr = addr;
    }
    get id()    {return this.#id }
    set id(x)   {this.#id = x; }
    
    get name()  {return this.#name }
    set name(n) {this.#name = n; }
    
    get pswd()  {return this.#pswd }
    set pswd(p) {this.#pswd = p; }
    
    get type()  {return this.#type }
    set type(t) {this.#type = t; }
   
    get addr()  {return this.#addr }
    set addr(a) {this.#addr = a; }

    login(name, pswd){

    }
    signin(name, pswd, type, addr) {

    }
    read(id) {

    }
    update(id, name, pswd, type, addr) {

    }
    delete(id) {
        
    }
}module.exports.User=User;

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
}module.exports.Store=Store;

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
}module.exports.DeliveryMan=DeliveryMan;

class Customer extends User{
    #cart;
    constructor(id, name, pswd, type, addr, cart) {
        super(id, name, pswd, type, addr);
        this.#cart = cart;
    }
    get cart(){ return this.#cart }
    set cart(c) { this.#cart = c; }
}module.exports.Customer=Customer;
