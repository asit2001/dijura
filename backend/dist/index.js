"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const DB_1 = __importDefault(require("./config/DB"));
const const_1 = require("./config/const");
const index_1 = __importDefault(require("./api/v1/routes/index"));
const serverError_1 = __importDefault(require("./errors/serverError"));
const doc_json_1 = __importDefault(require("./doc/doc.json"));
(0, DB_1.default)();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    exposedHeaders: ['Cookie', "Authorization"],
    credentials: true,
    origin: 'http://localhost:5173'
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use('/api/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(doc_json_1.default, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css'
}));
exports.app.use('/api/v1', index_1.default);
exports.app.use((err, req, res, next) => {
    if (err instanceof serverError_1.default) {
        return res.status(err.status).json({
            success: false,
            status: 'error',
            title: err.title,
            message: err.message,
        });
    }
    res.status(500).json({
        success: false,
        status: 'error',
        title: 'Internal Server Error',
        message: err.message,
    });
    next();
});
if (!const_1.IS_TEST) {
    exports.app.listen(const_1.PORT, () => {
        console.log('server running at port ' + const_1.PORT);
    });
}
