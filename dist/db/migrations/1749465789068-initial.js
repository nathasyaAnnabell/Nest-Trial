"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1749465789068 = void 0;
class Initial1749465789068 {
    name = 'Initial1749465789068';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "name" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'guest', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.Initial1749465789068 = Initial1749465789068;
//# sourceMappingURL=1749465789068-initial.js.map