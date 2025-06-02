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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_template_1 = require("../../utils/responseTemplate/response.template");
const auth_guard_1 = require("../../guards/auth/auth.guard");
const categoryRequest_1 = require("./dto/categoryRequest");
const category_service_1 = require("./category.service");
let CategoryController = class CategoryController {
    constructor(categoryService, responseTemplate) {
        this.categoryService = categoryService;
        this.responseTemplate = responseTemplate;
    }
    async createUser(categoryRequest, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.createCategory(categoryRequest)));
    }
    async getCategoryById(id, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.getCateogryById(id)));
    }
    async getAllCategories(page, limit, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.getAllCategories(page, limit)));
    }
    async modifyCategory(id, categoryRequest, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.modifyCategory(id, categoryRequest)));
    }
    async deleteCategory(id, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.deleteCategory(id)));
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categoryRequest_1.CategoryRequest, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, categoryRequest_1.CategoryRequest, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "modifyCategory", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        response_template_1.ResponseTemplate])
], CategoryController);
//# sourceMappingURL=category.controller.js.map