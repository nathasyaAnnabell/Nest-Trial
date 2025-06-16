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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    usersRepository;
    jwtService;
    configService;
    constructor(usersRepository, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signup(userSignUpDto) {
        const userExists = await this.findUserByEmail(userSignUpDto.email);
        if (userExists)
            throw new common_1.BadRequestException('Email is not available');
        userSignUpDto.password = await (0, bcrypt_1.hash)(userSignUpDto.password, 10);
        const user = await this.usersRepository.save(this.usersRepository.create(userSignUpDto));
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async signin(userSignInDto) {
        const userExists = await this.usersRepository
            .createQueryBuilder('users')
            .addSelect('users.password')
            .where('users.email = :email', { email: userSignInDto.email })
            .getOne();
        if (!userExists)
            throw new common_1.BadRequestException('Bad credentials');
        const matchPassword = await (0, bcrypt_1.compare)(userSignInDto.password, userExists.password);
        if (!matchPassword)
            throw new common_1.BadRequestException('Bad credentials');
        const { password, ...userWithoutPassword } = userExists;
        return {
            id: userWithoutPassword.id,
            email: userWithoutPassword.email,
            name: userWithoutPassword.name,
        };
    }
    create(_createUserDto) {
        return 'This action adds a new user';
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException(`User not found`);
        return user;
    }
    update(id, _updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async findUserByEmail(email) {
        return await this.usersRepository.findOneBy({ email });
    }
    async accessToken(payload) {
        try {
            console.log('Payload for JWT:', payload);
            const token = await this.jwtService.signAsync({
                id: payload.id,
                email: payload.email,
            });
            return token;
        }
        catch (err) {
            console.error('JWT ERROR:', err);
            throw new Error('Failed to generate access token');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map