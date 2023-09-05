export class Order {
    orderdate: string;
    id: string;
    customer: string;
    total: string;
    status: string;
    shipdate: string;
    trackingnumber:string;
    constructor (
        orderdate: string,
        id: string,
        customer: string,
        total: string,
        status: string,
        shipdate: string,
        trackingnumber:string
    ) {
      this.orderdate = orderdate;
      this.id = id;
      this.customer = customer;
      this.total = total;
      this.status = status;
      this.shipdate = shipdate;
      this.trackingnumber = trackingnumber;
    }
}