"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entity/user/user.entity");
const userDetail_entity_1 = require("./entity/userDetail/userDetail.entity");
const userRepository_1 = require("./entity/user/userRepository");
const userDetailRepository_1 = require("./entity/userDetail/userDetailRepository");
const response_template_1 = require("../../utils/responseTemplate/response.template");
const jwt_1 = require("@nestjs/jwt");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.register({
                secret: 'SysTemDonUncle32',
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, userDetail_entity_1.UserDetail, userRepository_1.UserRepository, userDetailRepository_1.UserDetailRepository]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, response_template_1.ResponseTemplate,],
        exports: [user_service_1.UserService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map