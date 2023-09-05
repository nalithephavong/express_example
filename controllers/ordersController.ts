import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/ordersModel';

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