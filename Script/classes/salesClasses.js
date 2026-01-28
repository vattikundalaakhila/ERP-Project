export default class Sale{
    constructor (id, product, quantity, unitprice, total, currentTimeStamp){
        this.id = id;
        this.product=product;
        this.quantity = quantity;
        this.unitprice = unitprice;
        this.total = total;
        this.currentTimeStamp= currentTimeStamp;
    }
}