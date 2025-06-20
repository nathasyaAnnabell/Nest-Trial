"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../db/data-source");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const current_user_middleware_1 = require("./utility/middlewares/current-user.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(current_user_middleware_1.CurrentUserMiddleware)
            .forRoutes({ path: '/api/*path', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('ACCESS_TOKEN_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get('ACCESS_TOKEN_EXPIRED_TIME') || '1h',
                    },
                }),
            }),
            users_module_1.UsersModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map