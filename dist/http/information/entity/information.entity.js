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
exports.Information = void 0;
const category_entity_1 = require("../../category/entity/category.entity");
const typeorm_1 = require("typeorm");
let Information = class Information {
};
exports.Information = Information;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Information.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Information.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: false }),
    __metadata("design:type", Boolean)
], Information.prototype, "isPublish", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Information.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Information.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Date)
], Information.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Categories, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'categories_information',
        joinColumn: { name: 'information_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Information.prototype, "categories", void 0);
exports.Information = Information = __decorate([
    (0, typeorm_1.Entity)('informations')
], Information);
//# sourceMappingURL=information.entity.js.map