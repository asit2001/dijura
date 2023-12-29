"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const const_1 = require("../../../config/const");
const authDetailSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    login_hash: {
        type: String,
        select: false,
    },
    refresh_token: {
        type: String,
        immutable: false,
    },
    refresh_token_expires: {
        type: Date,
    },
    isRevoked: {
        type: Boolean,
        default: false,
    },
    revoked_at: {
        type: Date,
    },
}, { timestamps: true });
authDetailSchema.method('getAuthToken', function () {
    return jsonwebtoken_1.default.sign({ id: this._id, role: this.user.role }, const_1.JWT_SECRET, {
        expiresIn: const_1.JWT_EXPIRE,
    });
});
authDetailSchema.method('getRefreshToken', function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id, role: this.user.role }, const_1.REFRESH_SECRET, {
        expiresIn: const_1.REFRESH_EXPIRE,
    });
    this.refresh_token = token;
    this.refresh_token_expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return token;
});
const AuthDetail = mongoose_1.default.model('AuthDetail', authDetailSchema);
exports.default = AuthDetail;
