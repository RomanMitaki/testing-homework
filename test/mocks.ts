import { ProductShortInfo, Product } from "../src/common/types";

export const fakeShortProducts: ProductShortInfo[] = [
    {
        id: 1,
        name: 'Elegant kogtetochka',
        price: 100,
    },
    {
        id: 2,
        name: 'Modern kogtetochka',
        price: 200,
    },
    {
        id: 3,
        name: 'Fantastic kogtetochka',
        price: 300,
    },
]

export const fakeFullProducts: Product[] = [
    {
        id: 1,
        name: 'Elegant kogtetochka',
        price: 100,
        description: 'Really Licensed kogtetochka for Pixiebob',
        color: 'Salmon',
        material: 'Steel',
    },
    {
        id: 2,
        name: 'Modern kogtetochka',
        price: 200,
        description: 'Really Elegant kogtetochka for Donskoy',
        color: 'Tan',
        material: 'Fresh',
    },
    {
        id: 3,
        name: 'Fantastic kogtetochka',
        price: 300,
        description: 'Really Handcrafted kogtetochka for Donskoy',
        color: 'Red',
        material: 'Fresh',
    },
]


export const fakeCartContent = {
    [fakeShortProducts[0].id]: {
        name: fakeShortProducts[0].name,
        price: fakeShortProducts[0].price,
        count: 1
    },
    [fakeShortProducts[1].id]: {
        name: fakeShortProducts[1].name,
        price: fakeShortProducts[1].price,
        count: 1
    },
};
