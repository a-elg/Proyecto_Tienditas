class User {
    #id;
    #name;
    #pswd;
    #type;
    #addr;
    #phone
    constructor(id, name, pswd, type, addr, phone) {
        this.#id = id;
        this.#name = name;
        this.#pswd = pswd;
        this.#type = type;
        this.#addr = addr;
        this.#phone = phone;
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

    get phone()  {return this.#phone }
    set phone(ph) {this.#phone = ph; }

    signin(name, pswd){

    }
    signup(name, pswd, type, addr) {

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
    constructor(id, name, pswd, type, addr,phone, catalog, suscription) {
        super(id, name, pswd, type, addr, phone);
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
    #rfc;
    constructor(id, name, pswd, type, addr, phone, history, balance,rfc) {
        super(id, name, pswd, type, addr, phone);
        this.#history = history;
        this.#balance = balance;
        this.#rfc = rfc;
    }
    get history(){ return this.#history }
    set history(his) { this.#history = his; }
    get balance(){ return this.#balance }
    set balance(bal) { this.#balance = bal; }
    get rfc(){ return this.#rfc }
    set rfc(rfc) { this.#rfc = rfc; }
    static getNearestDeliveryMan() {

    }
}module.exports.DeliveryMan=DeliveryMan;

class Customer extends User{
    #cart;
    constructor(id, name, pswd, type, addr,phone,cart) {
        super(id, name, pswd, type, addr, phone);
        this.#cart = cart;//See Product.js -> Stock 
    }
    get cart(){ return this.#cart }
    set cart(c) { this.#cart = c; }
}module.exports.Customer=Customer;
