"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const response_template_1 = require("../../utils/responseTemplate/response.template");
const category_entity_1 = require("./entity/category.entity");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const category_repository_1 = require("./entity/category.repository");
const user_module_1 = require("../users/user.module");
const information_module_1 = require("../information/information.module");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Categories]),
            user_module_1.UserModule,
            (0, common_1.forwardRef)(() => information_module_1.InformationModule),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [
            category_service_1.CategoryService,
            response_template_1.ResponseTemplate,
            {
                provide: 'CategoryRepository',
                useClass: category_repository_1.CategoryRepository,
            },
        ],
        exports: ['CategoryRepository'],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map