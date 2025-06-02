"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImageUploadInterceptor = FileImageUploadInterceptor;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
function FileImageUploadInterceptor(fieldName) {
    return (0, platform_express_1.FileInterceptor)(fieldName, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const originalNameTrimmed = file.originalname.replace(/\s+/g, '');
                const fileExt = (0, path_1.extname)(originalNameTrimmed);
                const baseName = originalNameTrimmed.replace(fileExt, '');
                const filename = `${Date.now()}-${baseName}${fileExt}`;
                cb(null, filename);
            },
        }),
    });
}
//# sourceMappingURL=fileInterceptor.js.map