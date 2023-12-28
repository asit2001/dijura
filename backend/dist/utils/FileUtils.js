"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONLY_IMAGES_ALLOWED = exports.uploadFile = void 0;
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const const_1 = require("../config/const");
const internalError_1 = __importDefault(require("../errors/internal-error/internalError"));
const commonError_1 = __importDefault(require("../errors/internal-error/commonError"));
const serviceAccountBuffer = Buffer.from(const_1.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64');
const serviceAccountJSON = serviceAccountBuffer.toString('utf-8');
const serviceAccount = JSON.parse(serviceAccountJSON);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: const_1.STORAGE_BUCKET,
});
const uploadFile = async (file) => {
    const bucket = firebase_admin_1.default.storage().bucket();
    const filePath = 'dijura/' + crypto_1.default.randomUUID() + path_1.default.extname(file.originalname);
    const fileUpload = bucket.file(filePath);
    await fileUpload.save(file.buffer, {
        public: true,
        metadata: {
            contentType: file.mimetype,
        },
    });
    const [fileUrl] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '01-01-2050',
        virtualHostedStyle: true
    });
    return new URL(fileUrl).href;
};
exports.uploadFile = uploadFile;
const ONLY_IMAGES_ALLOWED = (req, file, cb) => {
    if (file.mimetype !== 'image/png' &&
        file.mimetype !== 'image/jpg' &&
        file.mimetype !== 'image/jpeg') {
        return cb(new internalError_1.default(commonError_1.default.UNSUPPORTED_MEDIA));
    }
    cb(null, true);
};
exports.ONLY_IMAGES_ALLOWED = ONLY_IMAGES_ALLOWED;
