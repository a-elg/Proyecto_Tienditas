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
    get id(){ return this.#id }
    set id(x) { this.#id = x; }
    get name(){ return this.#name }
    set name(n) { this.#name = n; }
    get pswd(){ return this.#pswd }
    set pswd(p) { this.#pswd = p; }
    get type(){ return this.#type }
    set type(t) { this.#type = t; }
    get addr(){ return this.#addr }
    set addr(a) { this.#addr = a; }
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
}