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
exports.UserSignUp = void 0;
const class_validator_1 = require("class-validator");
const user_roles_enum_1 = require("../../utility/common/user-roles.enum");
const signin_user_dto_1 = require("./signin-user.dto");
class UserSignUp extends signin_user_dto_1.UserSignIn {
    name;
    role;
}
exports.UserSignUp = UserSignUp;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name should be string' }),
    __metadata("design:type", String)
], UserSignUp.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_roles_enum_1.UserRole, { message: 'Role must be either admin or guest' }),
    __metadata("design:type", String)
], UserSignUp.prototype, "role", void 0);
//# sourceMappingURL=signup-user.dto.js.map