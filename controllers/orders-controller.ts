import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/orders-model';

export interface CreateOrderRequest extends Request {
    body: {
        customer: string;
        total: string;
    }
}

export interface UpdateOrderRequest extends Request {
    body: {
        status: string;
    }
}

// DO NOT USE THIS IN PRODUCTION
// THIS IS JUST TO INITIALIZE TEST DATA
let ORDERS: Order[] = [
    {
        orderdate: '2023-08-01',
        id: '20000001',
        customer: 'A Popular Donut Place',
        total: '457.89',
        status: 'New',
        shipdate: '',
        trackingnumber: ''
    },
    {
        orderdate: '2023-08-02',
        id: '20000002',
        customer: 'Another Popular Donut Place',
        total: '975.42',
        status: 'In Process',
        shipdate: '',
        trackingnumber: ''
    }
];

// #region MAIN FUNCTIONS
export const getOrders = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        "orders": ORDERS
    });
}

export const createOrder = (req: CreateOrderRequest, res: Response, next: NextFunction) => {
    if (!req.body.customer) {
        return res.status(400).json({
            message: 'Invalid customer.'
        });
    }

    if (!req.body.total && isNaN(req.body.total as any)) {
        return res.status(400).json({
            message: 'Invalid total.'
        });
    }

    const orderDate = (new Date()).toISOString().split('T')[0];

    const previousOrder = ORDERS.reduce((prev, current) => {
        return (prev.id > current.id) ? prev : current
    });

    const nextOrderNumber = (parseInt(previousOrder.id) + 1).toString();

    const newOrder = new Order (
        orderDate,
        nextOrderNumber,
        req.body.customer,
        req.body.total,
        "New",
        "",
        ""
    );

    ORDERS.push(newOrder);
    
    return res.status(201).json({
        message: `Order ${nextOrderNumber} created.`,
        order: newOrder
    });
}

export const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const newOrders = ORDERS.filter((order) => {
        return order.id !== id;
    });

    ORDERS = newOrders;

    res.status(200).json({
        message: `Order ${id} deleted.`
    });
}

export const updateOrder = (req: UpdateOrderRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const orderIdx = ORDERS.findIndex((order) => {
        return order.id === id;
    });

    const status = req.body.status;
    ORDERS[orderIdx].status = status;

    if (status === "Shipped") {
        ORDERS[orderIdx].shipdate = (new Date()).toISOString().split('T')[0];
        ORDERS[orderIdx].trackingnumber = String(Math.floor(Math.random() * (10000000000 - 9000000000 + 1) + 9000000000));
    }

    return res.status(200).json({
        message: `Order ${id} updated.`
    });
}
// #endregion