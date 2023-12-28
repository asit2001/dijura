"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateAfterAndEqualToday = void 0;
const date_fns_1 = require("date-fns");
const isDateAfterAndEqualToday = (date) => {
    const parseDate = (0, date_fns_1.parseISO)(date);
    if ((0, date_fns_1.isValid)(parseDate) && ((0, date_fns_1.isAfter)(parseDate, new Date()) || (0, date_fns_1.isToday)(parseDate))) {
        return true;
    }
    return false;
};
exports.isDateAfterAndEqualToday = isDateAfterAndEqualToday;
