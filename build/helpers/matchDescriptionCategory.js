"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchDescriptionCategory = void 0;
const types_1 = require("../types/types");
const matchDescriptionCategory = (newPrice) => {
    if (newPrice < 1600) {
        const newDescription = types_1.DESCRIPTION_CATEGORY.LIGHT;
        return newDescription;
    }
    else if (newPrice > 1601 && newPrice < 2400) {
        const newDescription = types_1.DESCRIPTION_CATEGORY.HATCH;
        return newDescription;
    }
    else if (newPrice > 2401 && newPrice < 2700) {
        const newDescription = types_1.DESCRIPTION_CATEGORY.SEDAN;
        return newDescription;
    }
    else if (newPrice > 2701 && newPrice < 2900) {
        const newDescription = types_1.DESCRIPTION_CATEGORY.PRIME;
        return newDescription;
    }
    else if (newPrice > 2901) {
        const newDescription = types_1.DESCRIPTION_CATEGORY.LUX;
        return newDescription;
    }
};
exports.matchDescriptionCategory = matchDescriptionCategory;
//# sourceMappingURL=matchDescriptionCategory.js.map