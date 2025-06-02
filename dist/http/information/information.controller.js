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
exports.InformationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_template_1 = require("../../utils/responseTemplate/response.template");
const auth_guard_1 = require("../../guards/auth/auth.guard");
const informationRequest_1 = require("./dto/informationRequest");
const information_service_1 = require("./information.service");
const putIsPublishRequest_1 = require("./dto/putIsPublishRequest");
let InformationController = class InformationController {
    constructor(responseTemplate, informationService) {
        this.responseTemplate = responseTemplate;
        this.informationService = informationService;
    }
    async createUser(informationRequest, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.createInformation(informationRequest)));
    }
    async getAllInformations(page, limit, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.getAllInformation(page, limit)));
    }
    async putIsPublishInformations(PutPublishRequest, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.updatePublish(PutPublishRequest)));
    }
    async modifyInformation(id, InformationRequest, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.modifyInformation(id, InformationRequest)));
    }
    async deleteInformation(id, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.deleteInformation(id)));
    }
};
exports.InformationController = InformationController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Information', description: 'This endpoint creates a new Informations and returns the response.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [informationRequest_1.InformationRequest, Object]),
    __metadata("design:returntype", Promise)
], InformationController.prototype, "createUser", null);
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
], InformationController.prototype, "getAllInformations", null);
__decorate([
    (0, common_1.Put)('/isPublish'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [putIsPublishRequest_1.PutPublishRequest, Object]),
    __metadata("design:returntype", Promise)
], InformationController.prototype, "putIsPublishInformations", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, informationRequest_1.InformationRequest, Object]),
    __metadata("design:returntype", Promise)
], InformationController.prototype, "modifyInformation", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InformationController.prototype, "deleteInformation", null);
exports.InformationController = InformationController = __decorate([
    (0, swagger_1.ApiTags)('informations'),
    (0, common_1.Controller)('informations'),
    __metadata("design:paramtypes", [response_template_1.ResponseTemplate,
        information_service_1.InformationService])
], InformationController);
//# sourceMappingURL=information.controller.js.map