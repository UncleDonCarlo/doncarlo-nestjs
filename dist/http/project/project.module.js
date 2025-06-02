"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const response_template_1 = require("../../utils/responseTemplate/response.template");
const user_module_1 = require("../users/user.module");
const category_module_1 = require("../category/category.module");
const project_entity_1 = require("./entity/project.entity");
const project_controller_1 = require("./project.controller");
const project_service_1 = require("./project.service");
const project_repository_1 = require("./entity/project.repository");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]),
            user_module_1.UserModule,
            (0, common_1.forwardRef)(() => category_module_1.CategoryModule),
        ],
        controllers: [project_controller_1.ProjectController],
        providers: [
            project_service_1.ProjectService,
            response_template_1.ResponseTemplate,
            {
                provide: 'projectRepository',
                useClass: project_repository_1.ProjectRepository,
            },
        ],
        exports: ['projectRepository'],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map