"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTemplate = void 0;
const common_1 = require("@nestjs/common");
let ResponseTemplate = class ResponseTemplate {
    constructor() { }
    async createResponseTemplate(callback) {
        try {
            const data = await callback();
            return {
                status: 200,
                message: 'Successfully',
                data: data,
            };
        }
        catch (error) {
            return {
                status: error.status,
                message: error.message,
            };
        }
    }
};
exports.ResponseTemplate = ResponseTemplate;
exports.ResponseTemplate = ResponseTemplate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ResponseTemplate);
//# sourceMappingURL=response.template.js.map