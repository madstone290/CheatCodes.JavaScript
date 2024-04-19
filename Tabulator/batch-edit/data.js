import { Card, User, Product, Location } from './model.js';

/**
 * @type {Array<Product>}
 */
const PRODUCT_LIST = [
    {
        id: 1,
        name: "Pen",
    },
    {
        id: 2,
        name: "Pencil",
    },
    {
        id: 3,
        name: "Eraser",
    },
    {
        id: 4,
        name: "Ruler",
    },
    {
        id: 5,
        name: "Notebook",
    },
];

/**
 * @type {Array<Location>}
 */
const LOCATION_LIST = [
    {
        id: 1,
        name: "Room 101",
    },
    {
        id: 2,
        name: "Hotel 102",
    },
    {
        id: 3,
        name: "Cabin 103",
    },
    {
        id: 4,
        name: "Work Site #2",
    },
    {
        id: 5,
        name: "Model Home 5",
    },
];

/**
 * @type {Array<User>}
 */
const USER_LIST = [
    {
        id: 1,
        name: "Alice",
    },
    {
        id: 2,
        name: "Bob",
    },
    {
        id: 3,
        name: "Charlie",
    },
    {
        id: 4,
        name: "David",
    },
    {
        id: 5,
        name: "Eve",
    },
];

/**
 * @type {Array<Card>}
 */
const CARD_LIST = [
    {
        id: 1,
        workDate: "2021-01-01",
        userId: 1,
        productId: 1,
        locationId: 1,
        hours: 1,
    },
    {
        id: 2,
        workDate: "2021-01-02",
        userId: 2,
        productId: 2,
        locationId: 2,
        hours: 2,
    },
    {
        id: 3,
        workDate: "2021-01-03",
        userId: 3,
        productId: 3,
        locationId: 3,
        hours: 3,
    },
    {
        id: 4,
        workDate: "2021-01-04",
        userId: 4,
        productId: 4,
        locationId: 4,
        hours: 4,
    },
    {
        id: 5,
        workDate: "2021-01-05",
        userId: 5,
        productId: 5,
        locationId: 5,
        hours: 5,
    },
];

function getCardList(count) {
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push({
            id: i + 1,
            workDate: "2021-01-01",
            userId: 1,
            productId: 1,
            locationId: 1,
            hours: 1,
        });
    }
    return list;

}


export { getCardList, CARD_LIST, PRODUCT_LIST, LOCATION_LIST, USER_LIST };