"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("./user/Auth"));
const User_1 = __importDefault(require("./user/User"));
const Book_1 = __importDefault(require("./book/Book"));
const Transaction_1 = __importDefault(require("./transaction/Transaction"));
const router = express_1.default.Router();
router.use('/auth', new Auth_1.default().getRouter());
router.use('/user', new User_1.default().getRouter());
router.use('/book', new Book_1.default().getRouter());
router.use('/transaction', new Transaction_1.default().getRouter());
exports.default = router;
