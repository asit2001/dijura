"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionReturn = exports.transactionBorrow = exports.updateBookPayload = exports.bookPayload = exports.newUserPayload = exports.adminPayload = void 0;
const const_1 = require("../config/const");
const date_fns_1 = require("date-fns");
exports.adminPayload = {
    phone: 1234567890,
    role: const_1.USER_TYPES.ADMIN,
    password: 'admin1234',
    username: 'admin123',
    name: 'admin',
    email: 'admin@gmail.com',
};
exports.newUserPayload = {
    phone: 11111111111,
    role: const_1.USER_TYPES.USER,
    password: 'aaaaaaaaaaaaa',
    username: 'a123456',
    name: 'aaaaa',
    email: 'aaaaa@gmail.com',
};
exports.bookPayload = {
    name: 'react',
    author: 'asit biswas',
    available: true,
};
exports.updateBookPayload = {
    name: 'nodejs',
    author: 'asit biswas',
    available: true,
};
function transactionBorrow(userID, bookID) {
    const transactionPayload = {
        user: userID,
        book: bookID,
        dueDate: (0, date_fns_1.addDays)(new Date(), 5),
        transactionType: const_1.TRANSACTION_TYPES.BORROWED
    };
    return transactionPayload;
}
exports.transactionBorrow = transactionBorrow;
function transactionReturn(userID, bookID) {
    const transactionPayload = {
        user: userID,
        book: bookID,
        dueDate: new Date(),
        transactionType: const_1.TRANSACTION_TYPES.RETURNED
    };
    return transactionPayload;
}
exports.transactionReturn = transactionReturn;
